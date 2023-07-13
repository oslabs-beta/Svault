// import { redirect } from '@sveltejs/kit';
// import { nanoid } from 'nanoid';

// export async function getGitHubIdentity(client_id: string, cookieSetter?: any, maxAge?: number,): Promise<any> {
//   const state = nanoid();
//   const cookieHeader = `github_oauth_state=${state}; HttpOnly; Max-Age=3600; Path=/`;

//   // cookieSetter("github_oauth_state", state, {
//   //   httpOnly: true,
//   //   maxAge: maxAge ? maxAge : 60 * 60, // 1 hour expiry
//   //   path: "/"
//   // });
//   const authorizationUrlSearchParams = await new URLSearchParams({
//     client_id: client_id,
//     state,
//     // params: { scope: "read:user user:email" },
//   });
//   const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;

//   const headers = new Headers();
//   headers.append('Set-Cookie', cookieHeader);
//   headers.append('Location', authorizationUrl);
//   return headers
//   // return {
//   //   status: 302,
//   //   headers: {
//   //     Location: authorizationUrl
//   //   }
//   // };
// }
// export async function getGitHubValidation(client_id: string, client_secret: string, storedState: string, state: string, code: string) {
//   // const url = window.location.href;
//   // console.log('url', url)
//   // const storedState = cookies.get("github_oauth_state");
//   // const state = url.searchParams.get("state");
//   if (!storedState || !state || storedState !== state) {
//     return new Response(null, {
//       status: 400
//     });
//   }
//   // const code = url.searchParams.get("code");
//   if (!code) {
//     return new Response(null, {
//       status: 400
//     });
//   }
//   const response = await fetch("https://github.com/login/oauth/access_token", {
//     method: "POST",
//     body: new URLSearchParams({
//       client_id: client_id,
//       client_secret: client_secret,
//       code
//     }),
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Accept: "application/json"
//     }
//   });
//   if (!response.ok) {
//     console.log('Response was NOT okay');
//     return new Response(null, {
//       status: 400
//     });
//   }
//   const result = await response.json() as { access_token: string }
//   const accessToken = result.access_token
//   // console.log('Token:', result);
//   // do stuff with access token
//   // return some response

//   return accessToken
//   //try to just return here with a redirect
//   // return new Response('Redirect', {status: 303, headers: { Location: '/secret' }});
// }




