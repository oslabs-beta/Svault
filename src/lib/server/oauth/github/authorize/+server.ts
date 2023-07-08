import { dev } from '$app/environment';
//maybe a problem revisit
import { nanoid } from 'nanoid';
import { GITHUB_CLIENT_ID } from '$env/static/private';



    export const GET = async ({ cookies }) => {
        // console.log('This is the cookie you are looking for ', cookies.set);
        // console.log('GET function in auth/server.ts has been run');
        const state = nanoid(); // I recommend using nanoid
        cookies.set("github_oauth_state", state, {
            httpOnly: true,
            secure: !dev, // disable when using localhost
            maxAge: 60 * 60, // 1 hour expiry,
            path: "/"
        });
        const authorizationUrlSearchParams = await new URLSearchParams({
            client_id: GITHUB_CLIENT_ID,
            state
            // params: { scope: "read:user user:email" },
        });
        const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
        // redirect to authorization url
        // console.log('URL ',authorizationUrl)
        return new Response(null, {
            status: 302,
            headers: {
                Location: authorizationUrl
            }
        });
    }