import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const GET = async ({ cookies, url }) => {
  const storedState = cookies.get("google_oauth_state");
  const state = url.searchParams.get("state");
  const redirectURL = 'http://localhost:5173/oauth/google/validate';
  const code = await url.searchParams.get('code');

  if (!storedState || !state || storedState !== state) {
    console.log('bad state')
    return new Response(null, {
      status: 400
    });
  }
  if (!code) {
    // Handle the case when 'code' is null or empty
    console.log("No authorization code provided");
    throw redirect(303, '/');
  }

  //working
  try {
    const oAuth2Client = new OAuth2Client({

      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri: redirectURL
    });
    // console.log('hey');
    const { tokens } = await oAuth2Client.getToken(code);
    // console.log(tokens)
    oAuth2Client.setCredentials(tokens);
    // console.log('Auth Tokens Received');
    const user = oAuth2Client.credentials;
    console.log('Credentials', user);
  } catch (err) {
    // console.log("Error logging in with Google", err);
  }
  return new Response();
  // // throw redirect(303, '/');
};