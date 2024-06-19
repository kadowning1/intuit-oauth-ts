import OAuthClient from 'intuit-oauth-ts';
import { NextApiRequest, NextApiResponse } from 'next';

const oauthClient = new OAuthClient({
  clientId: process.env.NEXT_PUBLIC_QB_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_QB_CLIENT_SECRET as string,
  redirectUri: 'http://localhost:3000/api/callback',
  environment: 'sandbox',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request body:', req.body);
  const { accessToken, realmId } = req.body;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  if (!realmId) {
    return res.status(401).json({ error: 'Realm ID is missing' });
  }

  oauthClient.setToken({
    access_token: accessToken,
    refresh_token: '', // Placeholder since we don't need refresh_token for this example
    token_type: 'bearer',
    expires_in: 3600, // Placeholder
    x_refresh_token_expires_in: 8726400, // Placeholder
  });

  try {
    const response = await oauthClient.makeApiCall({
      // transport:{},

      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/companyinfo/${realmId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      // body: '', // Ensure the body is an empty string for GET requests
    });

    const responseData = JSON.parse(response.body);

    console.log('API Response:', responseData);

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error making API call:', error);
    res.status(500).json({ error: 'Error making API call', details: error });
  }
};
