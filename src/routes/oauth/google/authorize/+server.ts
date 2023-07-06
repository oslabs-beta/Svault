import { dev } from '$app/environment';
import { nanoid } from 'nanoid';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { OAuth2Client } from "google-auth-library";

export const GET = async ({ cookies }) => {
    const state = nanoid(); // I recommend using nanoid
    cookies.set("google_oauth_state", state, {
        httpOnly: true,
        secure: !dev, // disable when using localhost
        maxAge: 60 * 60, // 1 hour expiry,
        path: "/"
    });

    const redirectURL = 'http://localhost:5173/oauth/google/validate';

    const oAuth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        // state
        redirectURL
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid', // Modify the scope as needed
        prompt: 'consent',
        state
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: authorizeUrl
        }
    });
}
