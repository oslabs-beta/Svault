import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const GET = async ({ url }: { url: URL }): Promise<void> => {
  const redirectURL = 'http://localhost:5173/google';
  const code = await url.searchParams.get('code');

  if (!code) {
    // Handle the case when 'code' is null or empty
    console.log("No authorization code provided");
    throw redirect(303, '/');
  }

  try {
    const oAuth2Client = new OAuth2Client({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri: redirectURL
    });

    const { tokens } = await oAuth2Client.getToken(code);
    console.log(tokens)
    oAuth2Client.setCredentials(tokens);
    console.log('Auth Tokens Received');
    const user = oAuth2Client.credentials;
    console.log('Credentials', user);
  } catch (err) {
    console.log("Error logging in with Google", err);
  }

  throw redirect(303, '/oauth');
};