import { NextApiRequest, NextApiResponse } from 'next';
import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import * as bcrypt from 'bcrypt';

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
      };

      // Verify username isn't already taken
      const existingUser = await UserSchema.findOne({
        username: credentials.username,
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      const user = new UserSchema({
        username: credentials.username,
        password: hashedPassword,
      });
      await user.save();

      return res.status(201).json({ message: 'Account has been created' });

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
