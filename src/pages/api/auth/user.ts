import { NextApiRequest, NextApiResponse } from 'next';
import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = parse(req.headers.cookie || '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  switch (req.method) {
    case 'GET':
      await connectToMongoDB();

      try {
        const user = await UserSchema.findById(decoded._id);
        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;

        return res.status(200).json({ user: userWithoutPassword });
      } catch (error) {
        res.setHeader(
          'Set-Cookie',
          'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly;'
        );
        return res.status(400).json({ message: 'User not found' });
      }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
