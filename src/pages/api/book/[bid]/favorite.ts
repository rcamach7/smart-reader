import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToMongoDB } from '@/services/mongobd';
import { BookSchema, UserSchema } from '@/schemas/index';
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

  const { bid } = req.query;
  if (!bid || typeof bid !== 'string') {
    return res.status(400).json({ message: 'Book ID is required.' });
  }
  const { book } = req.body;

  try {
    switch (req.method) {
      case 'POST':
        try {
          await connectToMongoDB();
          const user = await UserSchema.findById(decodedAuthToken._id).populate(
            'savedBooks'
          );
          const bookInDB = await BookSchema.findOne({ googleId: bid });

          let liked = false;
          let bookIdToRemove = '';
          for (let i = 0; i < user.savedBooks.length; i++) {
            const book = user.savedBooks[i];
            if (book.googleId === bid) {
              liked = true;
              bookIdToRemove = book._id;
              break;
            }
          }

          if (liked) {
            const operation = { $pull: { savedBooks: bookInDB._id } };
            const updatedUser = await UserSchema.findByIdAndUpdate(
              decodedAuthToken._id,
              operation,
              { new: true }
            ).populate('savedBooks');

            return res.status(200).json({
              message: 'Removed from favorites',
              savedBooks: updatedUser.toObject().savedBooks,
            });
          } else {
            if (bookInDB) {
              const updatedUser = await UserSchema.findByIdAndUpdate(
                decodedAuthToken._id,
                { $push: { savedBooks: bookInDB._id } },
                { new: true }
              ).populate('savedBooks');

              return res.json({
                message: 'Added book to favorites',
                savedBooks: updatedUser.toObject().savedBooks,
              });
            } else {
              try {
                const newBook = new BookSchema({ ...book });
                const savedBook = await newBook.save();

                const updatedUser = await UserSchema.findByIdAndUpdate(
                  decodedAuthToken._id,
                  { $push: { savedBooks: savedBook._id } },
                  { new: true }
                ).populate('savedBooks');

                return res.json({
                  message: 'Added book to favorites',
                  savedBooks: updatedUser.toObject().savedBooks,
                });
              } catch (error) {
                console.error('Error saving book to user', error);
                res.status(500).json({ error: 'Error saving book to user' });
              }
            }
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Internal error adding book to shelf.',
            error,
          });
        }

      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
