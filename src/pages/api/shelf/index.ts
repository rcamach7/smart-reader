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

        const publicShelves = await ShelfSchema.find()
          .populate([
            {
              path: 'creator',
              match: { type: 'admin' },
              select: '-password -shelves -savedBooks',
            },
            { path: 'books' },
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
      break;

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
        const shelfObject = shelf.toObject();

        let updatedUser;
        try {
          updatedUser = await UserSchema.findByIdAndUpdate(
            decodedAuthToken._id,
            { $push: { shelves: shelf._id } },
            { new: true }
          ).populate({
            path: 'shelves',
            populate: {
              path: 'creator',
              select: '-password -savedBooks -shelves',
            },
          });
        } catch (userUpdateError) {
          return res.status(500).json({
            message: 'Error occurred while updating user',
            error: userUpdateError,
          });
        }

        return res.status(201).json({
          message: 'Shelf created successfully',
          shelf: shelfObject,
          shelves: updatedUser.toObject().shelves,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Error occurred while creating shelf', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
