import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = parse(req.headers.cookie || '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
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
    case 'POST':
      const { name, description, isPublic } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Missing Required Fields' });
      }

      console.log(name, description, isPublic);

      return res.status(201).end();

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
