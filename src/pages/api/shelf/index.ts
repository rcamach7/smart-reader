import { NextApiRequest, NextApiResponse } from 'next';

import { ShelfSchema, UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import { decodeAuthToken } from '@/utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        await connectToMongoDB();

        const publicShelves = await ShelfSchema.find({ public: true })
          .populate([
            {
              path: 'creator',
              select: '-password -shelves -savedBooks',
            },
            { path: 'books' },
            { path: 'likes', select: '-password -shelves -savedBooks' },
          ])
          .exec();

        return res.status(200).json({ shelves: publicShelves });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error retrieving shelves' });
      }

    case 'POST':
      let decodedAuthToken;
      try {
        decodedAuthToken = await decodeAuthToken(req);
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'User not authenticated', error });
      }

      const { name, description, isPublic } = req.body;
      if (!name || !description) {
        return res.status(400).json({ message: 'Missing Required Fields' });
      }

      try {
        await connectToMongoDB();

        const newShelf = new ShelfSchema({
          name,
          description,
          public: isPublic ? isPublic : false,
          creator: decodedAuthToken._id,
          books: [],
          likes: [],
        });
        const shelf = await newShelf.save();
        const populatedShelf = await shelf.populate({
          path: 'creator',
          select: '-password -savedBooks -shelves',
        });
        const shelfObject = populatedShelf.toObject();

        let updatedUser;
        try {
          updatedUser = await UserSchema.findByIdAndUpdate(
            decodedAuthToken._id,
            { $push: { shelves: shelf._id } },
            { new: true }
          );
        } catch (userUpdateError) {
          return res.status(500).json({
            message: 'Error occurred while updating user',
            error: userUpdateError,
          });
        }

        return res.status(201).json({
          message: 'Shelf created successfully',
          shelf: shelfObject,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error occurred while creating shelf', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
