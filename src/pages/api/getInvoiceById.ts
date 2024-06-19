import OAuthClient from 'intuit-oauth-ts';
import { NextApiRequest, NextApiResponse } from 'next';

import { refreshTokenMiddleware } from '@/middleware/refreshToken';

const oauthClient = new OAuthClient({
  clientId: process.env.QB_CLIENT_ID as string,
  clientSecret: process.env.QB_CLIENT_SECRET as string,
  redirectUri: 'http://localhost:3000/api/callback',
  environment: 'sandbox',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, refreshToken, realmId, invoiceId } = req.body;

  console.log('Received Payload:', {
    accessToken,
    refreshToken,
    realmId,
    invoiceId,
  });

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is missing' });
  }

  if (!realmId) {
    return res.status(401).json({ error: 'Realm ID is missing' });
  }

  if (!invoiceId) {
    return res.status(401).json({ error: 'Invoice ID is missing' });
  }

  try {
    const newTokens = await refreshTokenMiddleware({
      accessToken,
      refreshToken,
      realmId,
    });

    const makeApiCall = async (accessToken: string) => {
      try {
        const response = await oauthClient.makeApiCall({
          url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/invoice/${invoiceId}?minorversion=70`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseData = JSON.parse(response.body);
        console.log('API Response:', responseData);

        if (responseData.Invoice) {
          res.status(200).json(responseData.Invoice);
        } else {
          res.status(404).json({ error: 'Invoice not found' });
        }
      } catch (error) {
        console.error('Error making API call:', error);
        res
          .status(500)
          .json({ error: 'Error making API call', details: error });
      }
    };

    await makeApiCall(newTokens.accessToken);
  } catch (error) {
    console.error('Error in middleware:', error);
    res.status(500).json({ error: 'Error in middleware', details: error });
  }
};
