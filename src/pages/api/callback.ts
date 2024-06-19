import { serialize } from 'cookie';
import OAuthClient from 'intuit-oauth-ts';
import { NextApiRequest, NextApiResponse } from 'next';

const oauthClient = new OAuthClient({
  clientId: process.env.NEXT_PUBLIC_QB_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_QB_CLIENT_SECRET as string,
  redirectUri: 'http://localhost:3000/api/callback',
  environment: 'sandbox',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const parseRedirect = req.url || '';

  try {
    const authResponse = await oauthClient.createToken(parseRedirect);

    const tokenData = authResponse.getJson();

    tokenData.realmId = req.query.realmId as string;

    // Store the token data in a cookie
    const serializedToken = serialize('token', JSON.stringify(tokenData), {
      httpOnly: false, // Set to false to allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    console.log('The Token is', JSON.stringify(tokenData));
    console.log('The serialized token is', serializedToken);
    res.setHeader('Set-Cookie', serializedToken);

    // Redirect to the dashboard after handling the token
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
  } catch (e) {
    console.error('Error receiving token:', e);
    res.status(500).send('Error receiving token');
  }
};
