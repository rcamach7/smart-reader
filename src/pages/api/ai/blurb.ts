import { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthToken } from '@/utils/token';
import OpenAI from 'openai';
import { connectToMongoDB } from '@/services/mongobd';
import { UserSchema } from '@/schemas/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let decodedAuthToken;
  try {
    decodedAuthToken = await decodeAuthToken(req);
  } catch (error) {
    return res.status(400).json({ message: 'User not authenticated', error });
  }

  const { book } = req.body;

  switch (req.method) {
    case 'POST':
      try {
        await connectToMongoDB();
        const user = await UserSchema.findById(decodedAuthToken._id).populate(
          'savedBooks'
        );
        if (!user) {
          throw new Error('User not found');
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastUsed = user.apiUsage.dateLastUsed;
        lastUsed.setHours(0, 0, 0, 0);

        if (lastUsed < today) {
          user.apiUsage.dateLastUsed = today;
          user.apiUsage.dayUsage = 1;
        } else if (lastUsed.getTime() === today.getTime()) {
          if (user.apiUsage.dayUsage >= 10) {
            return res.status(400).json({ message: 'Daily limit exceeded' });
          } else {
            user.apiUsage.dayUsage += 1;
          }
        }
        await user.save();

        const openaiApi = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

        const bookDetails = `Analyze the book titled '${
          book.title
        }' (author: ${book.authors.join(', ')}, genre: ${book.categories?.join(
          ', '
        )}). Provide a concise blurb that captures the essence of the book.`;

        const userFavBooks = getRandomSubset(
          user.savedBooks,
          user.savedBooks.length > 12 ? 12 : user.savedBooks.length
        )
          .map((curBook) => `${curBook.title} by ${curBook.authors.join(', ')}`)
          .join(', ');

        const comparison =
          user.savedBooks.length > 0
            ? `If you find any clear similarities between '${book.title}' and these titles: ${userFavBooks}, highlight them, focusing on themes, writing style, or other relevant aspects. If you don't find string similarities, exclude any and all mention of them. And don't mention on your response that no similarities were found.`
            : `If no clear similarities are found, or if no favorited books are available, offer an independent assessment on whether '${book.title}' aligns with general reader interests based on its genre, themes, and author's style.`;

        const prompt = `${bookDetails} ${comparison}`;

        const completion = await openaiApi.chat.completions.create({
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          model: 'gpt-3.5-turbo',
        });

        return res
          .status(200)
          .json({ summary: completion.choices[0].message.content });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error retrieving shelf', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function getRandomSubset(array, size) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}
