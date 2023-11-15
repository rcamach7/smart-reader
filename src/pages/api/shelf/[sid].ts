import { NextApiRequest, NextApiResponse } from 'next';
import { ShelfSchema, UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

interface UpdateFields {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sid } = req.query;
  if (!sid) return res.status(400).json({ message: 'Missing shelf id' });

  const { token } = parse(req.headers.cookie || '');
  let decodedAuthToken;
  try {
    decodedAuthToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.setHeader(
      'Set-Cookie',
      'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly;'
    );
    return res
      .status(401)
      .json({ message: 'Invalid token, please login again.' });
  }

  switch (req.method) {
    case 'GET':
      try {
        await connectToMongoDB();

        const shelf = await ShelfSchema.findById(sid).populate([
          'books',
          'likes',
          'creator',
        ]);
        if (!shelf)
          return res.status(400).json({ message: 'Unable to find shelf' });

        return res.status(200).json({ shelf: shelf.toObject() });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error retrieving shelf', error });
      }

    case 'PUT':
      const { name, description, isPublic } = req.body;

      const updateFields: UpdateFields = {};
      if (name !== undefined) updateFields.name = name;
      if (description !== undefined) updateFields.description = description;
      if (isPublic !== undefined) updateFields.isPublic = isPublic;
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
          message: 'Please provide fields to update',
        });
      }

      try {
        await connectToMongoDB();

        const shelf = await ShelfSchema.findById(sid);
        if (shelf.creator !== decodedAuthToken._id) {
          return res
            .status(400)
            .json({ message: 'Only creator can update this shelf.' });
        }

        const updatedShelf = await ShelfSchema.findByIdAndUpdate(
          sid,
          updateFields,
          { new: true }
        ).populate(['books', 'likes', 'creator']);

        return res.status(201).json({
          message: 'Updated shelf',
          shelf: updatedShelf.toObject(),
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error updating shelf', error });
      }

    case 'DELETE':
      try {
        await connectToMongoDB();

        const shelf = await ShelfSchema.findById(sid);
        if (!shelf)
          return res.status(400).json({ message: 'Unable to find shelf' });

        if (shelf.creator !== decodedAuthToken._id) {
          return res
            .status(400)
            .json({ message: 'Only creator can delete this shelf.' });
        }

        const updatedUser = await UserSchema.findByIdAndUpdate(
          decodedAuthToken._id,
          { $pull: { shelves: sid } },
          { new: true }
        ).populate('shelves');

        await ShelfSchema.findByIdAndDelete(sid);

        return res.status(200).json({
          message: 'Shelf has been deleted',
          shelves: updatedUser.shelves,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error retrieving shelf', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
