import { NextApiRequest, NextApiResponse } from 'next';
import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

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
      const userPayload = {
        _id: user._id,
        username: user.username,
      };
      const secretKey = process.env.JWT_SECRET;
      const expiresIn = '1h';
      const token = jwt.sign(userPayload, secretKey, { expiresIn });
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // 1 hour from now
        secure: process.env.NODE_ENV === 'production', // Uncomment this line on deployment
        path: '/',
      };

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, cookieOptions)
      );
      return res.status(200).json({ message: 'Authentication successful' });

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
