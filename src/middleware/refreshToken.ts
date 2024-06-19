import OAuthClient from 'intuit-oauth-ts';

const oauthClient = new OAuthClient({
  clientId: process.env.NEXT_PUBLIC_QB_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_QB_CLIENT_SECRET as string,
  redirectUri: 'http://localhost:3000/api/callback',
  environment: 'sandbox',
});

interface TokenData {
  accessToken: string;
  refreshToken: string;
  realmId: string;
}

export const refreshTokenMiddleware = async (tokenData: TokenData) => {
  try {
    oauthClient.setToken({
      access_token: tokenData.accessToken,
      refresh_token: tokenData.refreshToken,
      token_type: 'bearer',
      expires_in: 3600, // Placeholder
      x_refresh_token_expires_in: 8726400, // Placeholder
    });

    console.log('Refreshing token with refresh token:', tokenData.refreshToken);
    const refreshResponse = await oauthClient.refreshUsingToken(
      tokenData.refreshToken
    );

    const newAccessToken = refreshResponse.getJson().access_token;
    const newRefreshToken = refreshResponse.getJson().refresh_token;
    console.log('Tokens refreshed:', { newAccessToken, newRefreshToken });

    // Update the token in the client
    oauthClient.setToken({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      token_type: 'bearer',
      expires_in: 3600, // Placeholder
      x_refresh_token_expires_in: 8726400, // Placeholder
    });

    // Return the new tokens
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Error refreshing token');
  }
};
