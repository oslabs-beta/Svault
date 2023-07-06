import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
console.log(GITHUB_CLIENT_ID)

export const GET = async ({ cookies, url }) => {
    // console.log('Hey youre in the validate folder +server.ts file inside the get function');
    const storedState = cookies.get("github_oauth_state");
    const state = url.searchParams.get("state");
    if (!storedState || !state || storedState !== state) {
        return new Response(null, {
            status: 400
        });
    }
    const code = url.searchParams.get("code");
    if (!code) {
        return new Response(null, {
            status: 400
        });
    }
    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        }
    });
    if (!response.ok) {
        // console.log('Response was NOT okay');
        return new Response(null, {
            status: 400
        });
    }
    const result = await response.json() as { access_token: string }
    const accessToken =  result.access_token
    console.log('Token:', result);
    // do stuff with access token
    // return some response
    return new Response();
}