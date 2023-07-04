import { redirect } from "@sveltejs/kit"
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "$env/static/private";


export const actions = {
    OAuth2: async() => {
        console.log('You are in ')
        const redirectURL = 'http://localhost:5173/oauth/google'

        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            redirectURL
        )

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile openid', //https://www.googleapis.com/auth/userinfo.profile openid|| https://www.googleapis.com/auth/drive.metadata.readonly',
            prompt: 'consent'
        });
        throw redirect(302,authorizeUrl)
    }
}
