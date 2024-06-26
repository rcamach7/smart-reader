import { NextApiRequest, NextApiResponse } from 'next';

import { ShelfSchema, UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
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

  switch (req.method) {
    case 'GET':
      await connectToMongoDB();

      try {
        const user = await UserSchema.findById(decodedAuthToken._id).populate([
          {
            path: 'shelves',
            populate: [
              {
                path: 'creator',
                select: '-password -savedBooks -shelves',
              },
              { path: 'books' },
            ],
          },
          {
            path: 'savedBooks',
          },
        ]);
        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;

        return res.status(200).json({ user: userWithoutPassword });
      } catch (error) {
        res.setHeader(
          'Set-Cookie',
          'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly;'
        );
        return res
          .status(400)
          .json({ message: 'Error occurred while retrieving user' });
      }

    case 'DELETE':
      try {
        await connectToMongoDB();
        const user = await UserSchema.findById(decodedAuthToken._id).populate(
          'shelves'
        );
        // Don't allow users to delete demo account.
        if (user.type === 'demo') {
          return res
            .status(400)
            .json({ message: 'Demo accounts may not be deleted' });
        }

        // Get all the shelves that the user has created, and delete them.
        const myShelves = user.shelves.filter(
          (shelf) =>
            shelf.creator.toString() === decodedAuthToken._id.toString()
        );
        await Promise.all(
          myShelves.map(async (myShelf) => {
            await ShelfSchema.findByIdAndDelete(myShelf._id);
          })
        );

        // Get all users that have my shelf saved, and delete it from their saved shelves.
        const usersWithMyShelves = await UserSchema.find({
          shelves: { $in: myShelves.map((shelf) => shelf._id) },
        });
        await Promise.all(
          usersWithMyShelves.map(async (otherUser) => {
            otherUser.shelves = otherUser.shelves.filter(
              (shelfId) =>
                !myShelves.some((myShelf) => myShelf._id.equals(shelfId))
            );
            await otherUser.save();
          })
        );

        await UserSchema.findByIdAndDelete(decodedAuthToken._id);
        res.setHeader(
          'Set-Cookie',
          'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly;'
        );
        return res
          .status(200)
          .json({ message: 'User and shelves successfully deleted' });
      } catch (error) {
        return res
          .status(500)
          .json({ error, message: 'Error processing delete request' });
      }

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
