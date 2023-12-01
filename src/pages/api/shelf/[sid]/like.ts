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
          const shelf = await ShelfSchema.findById(sid);

          let liked = false;
          for (let i = 0; i < shelf.likes.length; i++) {
            if (shelf.likes[i].toString() === decodedAuthToken._id) {
              liked = true;
              break;
            }
          }

          const updateOperation = liked
            ? { $pull: { likes: decodedAuthToken._id } }
            : { $push: { likes: decodedAuthToken._id } };

          const updatedShelf = await ShelfSchema.findByIdAndUpdate(
            sid,
            updateOperation,
            { new: true }
          ).populate([
            {
              path: 'likes',
              select: '-password -savedBooks -shelves',
            },
            { path: 'books' },
            { path: 'creator', select: '-password -savedBooks -shelves' },
          ]);

          return res.status(200).json({
            message: `${
              liked ? 'Removed like from shelf.' : 'Added like to shelf'
            }`,
            shelf: updatedShelf.toObject(),
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Internal error adding book to shelf.',
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
