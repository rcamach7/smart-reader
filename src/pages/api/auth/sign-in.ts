import { NextApiRequest, NextApiResponse } from 'next';
import * as bcrypt from 'bcrypt';
import validator from 'validator';

import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import { setJwtToken } from '@/utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const credentials = {
        username: req.body.username,
        password: req.body.password,
      };

      // Validation check
      if (!credentials.password || !credentials.username) {
        return res.status(400).json({ message: 'Missing fields' });
      } else if (
        !validator.isLength(credentials.username, { min: 4, max: 15 }) ||
        !validator.isLength(credentials.password, { min: 4, max: 20 })
      ) {
        return res.status(400).json({
          fieldId: 'username',
          helperText: 'Username or password did not meet length requirement',
        });
      }

      await connectToMongoDB();
      const user = await UserSchema.findOne({
        username: credentials.username,
      }).populate([
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
      // Before confirming password, we will check to see if user exists.
      if (!user) {
        return res
          .status(400)
          .json({ fieldId: 'username', helperText: 'Username not found' });
      }

      const doesPasswordMatch = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!doesPasswordMatch) {
        return res.status(400).json({
          fieldId: 'password',
          helperText: 'Incorrect Password',
        });
      }

      try {
        await setJwtToken({ _id: user._id, username: user.username }, res);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error setting token', err: error });
      }

      const userObject = user.toObject();
      const { password, ...userWithoutPassword } = userObject;
      return res.status(200).json({
        message: 'Authentication successful',
        user: userWithoutPassword,
      });

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
