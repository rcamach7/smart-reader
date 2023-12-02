import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/services/mongobd';
import { BookSchema, ShelfSchema } from '@/schemas/index';
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
  const { book } = req.body;

  if (!sid || typeof sid !== 'string' || !book) {
    return res.status(400).json({ message: 'Shelf ID and Book Are Required' });
  }

  try {
    await connectToMongoDB();
    const shelf = await ShelfSchema.findById(sid).populate('creator');

    if (shelf.creator._id.toString() !== decodedAuthToken._id) {
      return res
        .status(400)
        .json({ message: 'Only creator may modify this shelf.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal error retrieving shelf.',
      error,
    });
  }

  try {
    switch (req.method) {
      case 'POST':
        try {
          let bookDoc = await BookSchema.findOne({ googleId: book.googleId });
          if (!bookDoc) {
            const newBook = new BookSchema({ ...book });
            bookDoc = await newBook.save();
          }

          const updatedShelf = await ShelfSchema.findByIdAndUpdate(
            sid,
            {
              $push: { books: bookDoc._id },
            },
            { new: true }
          ).populate([
            { path: 'books' },
            { path: 'likes', select: '-password -shelved -savedBooks' },
            { path: 'creator', select: '-password -shelved -savedBooks' },
          ]);

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

      case 'PUT':
        try {
          const bookDoc = await BookSchema.findOne({ googleId: book.googleId });
          console.log(bookDoc);

          const updatedShelf = await ShelfSchema.findByIdAndUpdate(
            sid,
            {
              $pull: { books: bookDoc._id },
            },
            { new: true }
          ).populate([
            { path: 'books' },
            { path: 'likes', select: '-password -shelved -savedBooks' },
            { path: 'creator', select: '-password -shelved -savedBooks' },
          ]);

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
