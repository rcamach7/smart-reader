import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { GenreSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = parse(req.headers.cookie || '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  let decodedAuthToken;
  try {
    decodedAuthToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.setHeader(
      'Set-Cookie',
      'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly;'
    );
    return res
      .status(401)
      .json({ message: 'Invalid token, please login again.' });
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
