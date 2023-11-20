import { NextApiRequest, NextApiResponse } from 'next';
import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import * as bcrypt from 'bcrypt';
import { setJwtToken } from '@/utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await connectToMongoDB();

      const credentials = {
        username: req.body.username,
        password: req.body.password,
        profileImage: req.body.profileImage
          ? req.body.profileImage
          : 'profile_img_1.png',
      };

      const existingUser = await UserSchema.findOne({
        username: credentials.username,
      });
      if (existingUser) {
        return res.status(400).json({
          message: 'Username already taken',
          fieldId: 'username',
          helperText: 'Username already taken',
        });
      }

      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      const user = new UserSchema({
        username: credentials.username,
        password: hashedPassword,
        profileImage: credentials.profileImage,
      });
      try {
        const savedUser = await user.save();
        const userObject = savedUser.toObject();
        const { password, ...userWithoutPassword } = userObject;

        await setJwtToken(
          { _id: savedUser._id, username: savedUser.username },
          res
        );

        return res.status(201).json({
          message: 'Account has been created',
          user: userWithoutPassword,
        });
      } catch (error) {
        return res.status(400).json({
          message: 'Error creating user and setting token',
          fieldId: 'error',
          helperText: 'Internal error creating and setting token',
          error,
        });
      }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
