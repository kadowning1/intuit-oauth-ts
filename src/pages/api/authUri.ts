import OAuthClient from 'intuit-oauth-ts';
import { NextApiRequest, NextApiResponse } from 'next';

const oauthClient = new OAuthClient({
  clientId: process.env.NEXT_PUBLIC_QB_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_QB_CLIENT_SECRET as string,
  redirectUri: 'http://localhost:3000/api/callback',
  environment: 'sandbox',
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  const authUri = oauthClient.authorizeUri({
    scope: [
      OAuthClient.scopes.Accounting,
      OAuthClient.scopes.OpenId,
      OAuthClient.scopes.Profile,
    ],
    state: 'testState',
  });

  res.send({ authUri });
};
