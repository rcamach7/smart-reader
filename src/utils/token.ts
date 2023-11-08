import { NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

export async function setJwtToken(
  payload: { _id: number; username: String },
  res: NextApiResponse
) {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = '1h';
  const token = jwt.sign(payload, secretKey, { expiresIn });
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 3600000), // 1 hour from now
    secure: process.env.NODE_ENV === 'production', // Uncomment this line on deployment
    path: '/',
  };
  res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));
}
