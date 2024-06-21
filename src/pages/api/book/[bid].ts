import type { NextApiRequest, NextApiResponse } from 'next';

import GoogleBooksAPI from '@/services/googleBooksAPI';
import { BookSchema } from '@/schemas/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bid } = req.query;
  const googleId = bid as string;
  if (!googleId) {
    return res.status(400).json({ message: 'Book ID Missing' });
  }

  try {
    switch (req.method) {
      case 'GET':
        try {
          let book = await BookSchema.findOne({ googleId });
          if (!book) {
            const googleBooksApi = new GoogleBooksAPI(
              process.env.GOOGLE_BOOKS_API_KEY
            );
            book = await googleBooksApi.findBookById(googleId);
          }

          return res.status(200).json({ book });
        } catch (error) {
          return res.status(500).json({
            message: 'Error retrieving book',
            error,
          });
        }

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
