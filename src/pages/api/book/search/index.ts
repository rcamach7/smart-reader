import type { NextApiRequest, NextApiResponse } from 'next';

import GoogleBooksAPI from '@/services/googleBooksAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.query as string;
  const type = req.query.type as string;
  if (!query || !type) {
    return res.status(400).json({ message: 'Missing search fields' });
  } else if (type !== 'query' && type !== 'isbn') {
    return res.status(400).json({ message: 'Invalid search type' });
  }

  try {
    switch (req.method) {
      case 'GET':
        try {
          const booksAPI = new GoogleBooksAPI(process.env.GOOGLE_BOOKS_API_KEY);
          if (type === 'query') {
            const response = await booksAPI.findBooksByQuery(query, 2);
            console.log(response.items[0].volumeInfo.industryIdentifiers);
            return res.status(200).json(response);
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'error', error });
        }
        break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
