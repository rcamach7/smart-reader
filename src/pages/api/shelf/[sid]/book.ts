import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/services/mongobd';
import { ShelfSchema } from '@/schemas/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sid } = req.query;
  const { bookId } = req.body;

  if (
    !sid ||
    typeof sid !== 'string' ||
    !bookId ||
    typeof bookId !== 'string'
  ) {
    return res
      .status(400)
      .json({ message: 'Shelf ID and Book ID are required' });
  }

  try {
    switch (req.method) {
      case 'PUT':
        try {
          await connectToMongoDB();

          const updatedShelf = await ShelfSchema.findByIdAndUpdate(
            sid,
            {
              $push: { books: bookId },
            },
            { new: true }
          ).populate(['books', 'likes', 'creator']);

          return res.status(200).json({
            message: 'Added book to shelf.',
            shelf: updatedShelf.toObject(),
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Internal error adding book to shelf.',
            error,
          });
        }

      case 'DELETE':
        try {
          await connectToMongoDB();

          const updatedShelf = await ShelfSchema.findByIdAndUpdate(
            sid,
            {
              $pull: { books: bookId },
            },
            { new: true }
          ).populate(['books', 'likes', 'creator']);

          return res.status(200).json({
            message: 'Deleted book from shelf.',
            shelf: updatedShelf.toObject(),
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Internal error deleting book from shelf.',
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
