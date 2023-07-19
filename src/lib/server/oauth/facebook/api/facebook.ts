//TODO cannot get validation redirect url to perform, run into node socket error
export const facebook = (clientId, clientSecret, path, callbackurl) => {

    return async ({ event, resolve }) => {
        // authorization endpoint to facebook
        if (event.url.pathname === '/oauth/facebook/auth') {
            const provider = getFacebookIdentity(clientId);

            return new Response('Redirect', { status: 302, headers: provider });
        }
        // console.log(event)
        if (event.url.pathname === '/oauth/facebook/validate') {
            console.log(event)
            // console.log(event.url)
            console.log('hey fb validate')
            // const token = await getFacebookValidation(clientId, clientSecret, event, callbackurl);
            // console.log(token);
            // return new Response('Redirect', { status: 302, headers: '/' });
        }
        return await resolve(event);
    }
}

export function getFacebookIdentity(client_id: string): Promise<Headers> {
    const state = nanoid();
    const cookieHeader = `facebook_oauth_state=${state}; HttpOnly; Max-Age=3600; Path=/`;
    const redirectURL = 'https://localhost:5173/oauth/facebook/validate';
    // const authorizationUrlSearchParams = new URLSearchParams({
    //   client_id: client_id,
    //   redirect_uri: redirectURL,
    //   state: state,
    //   scope: 'email',
    // });

    // const authorizationUrlNA = `https://www.facebook.com/v17.0/dialog/oauth?${authorizationUrlSearchParams}`;
    const authorizationUrl =`https://www.facebook.com/v17.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirectURL}&state=${state}`
    // console.log(authorizationUrlNA)
    // console.log(authorizationUrl)
    const headers = new Headers();
    headers.append('Set-Cookie', cookieHeader);
    headers.append('Location', authorizationUrl);
  
    return headers;
}

export async function getFacebookValidation(client_id: string, client_secret: string, event, callbackurl) {
    console.log('in validate',  client_id)
    // const storedState = event.cookies.get("facebook_oauth_state");
    // const state = event.url.searchParams.get("state");
    // const redirectURL = callbackurl
    // if (!storedState || !state || storedState !== state) {
    //   return new Response(null, {
    //     status: 400,
    //   });
    // }
    // const code = event.url.searchParams.get("code");
    // if (!code) {
    //   return new Response(null, {
    //     status: 400,
    //   });
    // }
    // const response = await fetch("https://graph.facebook.com/v17.0/oauth/access_token", {
    //     method: "POST",
    //     body: new URLSearchParams({
    //         client_id: client_id,
    //         client_secret: client_secret,
    //         code
    //     }),
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Accept: "application/json"
    //     }
    // });
    // if (!response.ok) {
    //     console.log('hey')
    //     return new Response(null, {
    //         status: 400
    //     });
    // }
    // const result = await response.json() as { access_token: string };
    // console.log(result)
    // const accessToken = result.access_token;
    // console.log(accessToken)
  }


// export const GET = async ({ cookies, url }) => {
//     const storedState = cookies.get("github_oauth_state");
//     const state = url.searchParams.get("state");
//     // console.log('hey')
//     if (!storedState || !state || storedState !== state) {
//         return new Response(null, {
//             status: 400
//         });
//     }
//     const code = url.searchParams.get("code");
//     if (!code) {
//         return new Response(null, {
//             status: 400
//         });
//     }
//     const response = await fetch("https://graph.facebook.com/v17.0/oauth/access_token", {
//         method: "POST",
//         body: new URLSearchParams({
//             client_id: FACEBOOK_CLIENT_ID,
//             client_secret: FACEBOOK_CLIENT_SECRET,
//             code
//         }),
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Accept: "application/json"
//         }
//     });
//     if (!response.ok) {
//         console.log('hey')
//         return new Response(null, {
//             status: 400
//         });
//     }
//     const result = await response.json() as { access_token: string };
//     console.log(result)
//     const accessToken = result.access_token;
//     console.log(accessToken)
//     // do stuff with access token
//     // return some response
//     return new Response();
// }