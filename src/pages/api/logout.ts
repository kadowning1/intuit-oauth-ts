import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const serializedToken = serialize('token', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', serializedToken);
  res.status(200).json({ message: 'Logged out' });
};
