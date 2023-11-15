import { NextApiRequest, NextApiResponse } from 'next';
import { GenreSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import { decodeAuthToken } from '@/utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gid } = req.query;
  if (!gid) return res.status(400).json({ message: 'Missing genre id' });

  let decodedAuthToken;
  try {
    decodedAuthToken = await decodeAuthToken(req);
  } catch (error) {
    return res.status(400).json({ message: 'User not authenticated', error });
  }

  switch (req.method) {
    case 'GET':
      try {
        await connectToMongoDB();

        const genre = await GenreSchema.findById(gid).populate('books');
        if (!genre)
          return res.status(400).json({ message: 'Unable to find genre' });

        return res.status(200).json({ genre: genre.toObject() });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error retrieving genre', error });
      }

    case 'PUT':
      const { bookId } = req.body;
      if (!bookId)
        return res.status(400).json({
          message: 'To add books to a genre, please provide a book id.',
        });
      try {
        await connectToMongoDB();

        const updatedGenre = await GenreSchema.findByIdAndUpdate(
          gid,
          { $push: { books: bookId } },
          { new: true }
        ).populate('books');

        return res.status(201).json({
          message: 'Added book to genre',
          genre: updatedGenre.toObject(),
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error updating genre', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
