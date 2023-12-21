import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToMongoDB } from '@/services/mongobd';
import { UserSchema } from '@/schemas/index';
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
          const user = await UserSchema.findById(decodedAuthToken._id).populate(
            'shelves'
          );

          let saved = false;
          for (let i = 0; i < user.shelves.length; i++) {
            if (user.shelves[i]._id.toString() === sid) {
              saved = true;
            }
          }

          const updateOperation = saved
            ? { $pull: { shelves: sid } }
            : { $push: { shelves: sid } };

          const updatedUser = await UserSchema.findByIdAndUpdate(
            decodedAuthToken._id,
            updateOperation,
            { new: true }
          ).populate({
            path: 'shelves',
            populate: [
              {
                path: 'creator',
                select: '-password -savedBooks -shelves',
              },
              { path: 'books' },
            ],
          });

          return res.status(200).json({
            message: `${saved ? 'Removed saved shelf.' : 'Saved shelf'}`,
            shelves: updatedUser.toObject().shelves,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Internal error saving shelf.',
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
