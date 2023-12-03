import type { NextApiRequest, NextApiResponse } from 'next';

import { ShelfSchema } from '@/schemas/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.query as string;
  if (!query) {
    return res.status(400).json({ message: 'Missing search fields' });
  }

  try {
    switch (req.method) {
      case 'GET':
        try {
          const shelves = await ShelfSchema.find({
            $and: [
              {
                $or: [
                  { name: new RegExp(query, 'i') },
                  { description: new RegExp(query, 'i') },
                ],
              },
              { public: true },
            ],
          }).populate([
            {
              path: 'creator',
              select: '-password -shelves -savedBooks',
            },
            { path: 'books' },
            { path: 'likes', select: '-password -shelves -savedBooks' },
          ]);

          return res.status(200).json({ shelves });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'error', error });
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
