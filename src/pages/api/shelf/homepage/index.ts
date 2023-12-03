import { NextApiRequest, NextApiResponse } from 'next';
import { ShelfSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        await connectToMongoDB();

        const publicShelves = await ShelfSchema.find()
          .populate([
            {
              path: 'creator',
              match: { type: 'admin' },
              select: '-password -shelves -savedBooks',
            },
            { path: 'books' },
            { path: 'likes', select: '-password -shelves -savedBooks' },
          ])
          .exec();
        const shelvesWithAdminCreator = publicShelves.filter(
          (shelf) => shelf.creator !== null
        );

        return res.status(200).json({ shelves: shelvesWithAdminCreator });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error retrieving shelves' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
