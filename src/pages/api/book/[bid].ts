import type { NextApiRequest, NextApiResponse } from 'next';
import { BookSchema } from '@/schemas/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bookid } = req.query;
  const googleId = bookid as string;
  if (!googleId) {
    return res.status(400).json({ message: 'Book ID Missing' });
  }

  try {
    switch (req.method) {
      case 'GET':
        try {
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Error retrieving book',
            error,
          });
        }

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
