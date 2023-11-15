import { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthToken } from '@/utils/token';
import { GenreSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';

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

  switch (req.method) {
    case 'POST':
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Missing Required Fields' });
      }

      try {
        await connectToMongoDB();

        const newGenre = new GenreSchema({
          name,
          description,
          books: [],
        });
        const genre = await newGenre.save();
        const genreObject = genre.toObject();

        return res.status(201).json({
          message: 'Genre created successfully',
          genre: genreObject,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Error occurred while creating genre', error });
      }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
