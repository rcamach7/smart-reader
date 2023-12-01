import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/services/mongobd';
import { ShelfSchema } from '@/schemas/index';
import { decodeAuthToken } from '@/utils/token';

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

  const { sid } = req.query;
  if (!sid || typeof sid !== 'string') {
    return res.status(400).json({ message: 'Shelf ID is required' });
  }

  try {
    switch (req.method) {
      case 'POST':
        try {
          await connectToMongoDB();
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Internal error adding shelves.',
            error,
          });
        }

      default:
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
