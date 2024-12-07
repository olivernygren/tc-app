import { firebaseConfig } from './firebaseClient';

const refreshExpiredIdToken = async (refreshToken: string) => {
  const firebasePublicAPIKey = firebaseConfig.apiKey;

  const endpoint = `https://securetoken.googleapis.com/v1/token?key=${firebasePublicAPIKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  });

  const responseJSON = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(responseJSON.error.message));
  }

  const idToken = responseJSON.id_token;

  return idToken;
};

// eslint-disable-next-line import/prefer-default-export
export { refreshExpiredIdToken };
