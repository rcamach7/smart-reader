import { NextApiRequest, NextApiResponse } from 'next';
import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
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

  switch (req.method) {
    case 'GET':
      await connectToMongoDB();

      try {
        const user = await UserSchema.findById(decodedAuthToken._id).populate([
          'shelves',
          'savedBooks',
        ]);
        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;

        return res.status(200).json({ user: userWithoutPassword });
      } catch (error) {
        res.setHeader(
          'Set-Cookie',
          'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly;'
        );
        return res
          .status(400)
          .json({ message: 'Error occurred while retrieving user' });
      }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
