import { nanoid } from 'nanoid';
import { OAuth2Client } from "google-auth-library";

//Custom hanndle hook for google to authenticate, validate, redirect, and return the google user email
//Set google callback URL to /oauth/api/validate
export const google = (clientId, clientSecret, path, callbackurl) => {

  return async ({ event, resolve }) => {
    //authorization endpoint to google
    if (event.url.pathname === '/oauth/google/auth') {
      const provider = getGoogleIdentity(clientId, clientSecret, callbackurl);
      return new Response('Redirect', { status: 302, headers: provider });
      //google callback enters here
    } else if (event.url.pathname === '/oauth/google/validate') {
      //Upon validation completetion return access token
      const token = await getGoogleValidation(clientId, clientSecret, event, callbackurl);
      //Use access token to request user's google primary email address
      const user = await getUser(token, event);
      event.locals.username = user;
      if (user !== undefined) {
        return new Response('Redirect', { status: 303, headers: { Location: path } });
      } else {
        return new Response('error in authorizing google user');
      }
    }
    return await resolve(event);
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
  const redirectURL = callbackurl
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
// 'https://www.googleapis.com/auth/userinfo.profile'
export async function getUser(accessToken, event) {
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
    // console.log(data.email);

    return data.email;
  } catch (error) {
    return new Response(null, {
      status: 400
    });
  }
}
