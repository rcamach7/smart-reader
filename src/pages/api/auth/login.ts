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
      const credentials = {
        username: req.body.username,
        password: req.body.password,
      };
      if (!credentials.password || !credentials.username) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      await connectToMongoDB();
      const user = await UserSchema.findOne({
        username: credentials.username,
      });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const doesPasswordMatch = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!doesPasswordMatch) {
        return res.status(400).json({ message: 'Incorrect Password' });
      }

      // User has been authorized. Time to create and set HTTP Cookie.

      return;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
