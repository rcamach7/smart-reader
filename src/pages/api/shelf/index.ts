import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized User' });
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
