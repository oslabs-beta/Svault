import { nanoid } from 'nanoid';
import { OAuth2Client } from "google-auth-library";

//Custom hanndle hook for google to authenticate, validate, redirect, and return the google user email
//Set google callback URL to /oauth/api/validate

export const google = (clientId, clientSecret, redirectPath, callbackurl) => {
  return {
    name: 'google',
    authPath: '/oauth/google/auth',
    validatePath: '/oauth/google/validate',
    getAuthIdentity: () => {
      const provider = getGoogleIdentity(clientId, clientSecret, callbackurl);
      return provider;
    },
    getValidation: async (event) => {
      const token = await getGoogleValidation(clientId, clientSecret, event, callbackurl);
      return token;
    },
    getUser: async (token) => {
      const user = await getUser(token);
      return user;
    },
    redirectPath,
  };
};

//set state as cookie and get authorization headers to google
export function getGoogleIdentity(client_id: string, client_secret: string, callbackurl): Promise<any> {
  const state = nanoid();
  const cookieHeader = `google_oauth_state=${state}; HttpOnly; Max-Age=3600; Path=/`;
  const redirectURL = callbackurl

  const oAuth2Client = new OAuth2Client(
    client_id,
    client_secret,
    redirectURL
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email openid', // Modify the scope as needed
    prompt: 'consent',
    state
  });
  const headers = new Headers();
  headers.append('Set-Cookie', cookieHeader);
  headers.append('Location', authorizeUrl);
  return headers;
}


//check state cookie and fetch access token
export async function getGoogleValidation(client_id: string, client_secret: string, event, callbackurl) {
  const storedState = event.cookies.get("google_oauth_state");
  const state = event.url.searchParams.get("state");
  if (!storedState || !state || storedState !== state) {
    return new Response(null, {
      status: 400,
    });
  }
  const code = event.url.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const oAuth2Client = new OAuth2Client({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: callbackurl
    });
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    const user = oAuth2Client.credentials;
    return user.access_token;
  } catch (err) {
    return new Response(null, {
      status: 400
    });
  }
}

//get google user email with access token and return the user email to event.locals.user
export async function getUser(accessToken) {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user information.');
    }

    const data = await response.json();
    const userData = {
      username: data.email,
    };
    return userData;
  } catch (error) {
    return new Response(null, {
      status: 400
    });
  }
}
