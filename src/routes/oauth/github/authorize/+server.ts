// import { dev } from '$app/environment';
// import { nanoid } from 'nanoid';

//     //convert this get method into something that is not dependent on +server.ts
//     //parameters possible are cookies method, client id, and max age optional
//     export const GET = async ({ cookies }) => {
//         // console.log('This is the cookie you are looking for ', cookies.set);
//         // console.log('GET function in auth/server.ts has been run');
//         const state = nanoid(); // I recommend using nanoid
//         cookies.set("github_oauth_state", state, {
//             httpOnly: true,
//             secure: !dev, // disable when using localhost
//             maxAge: 60 * 60, // 1 hour expiry,
//             path: "/"
//         });
//         const authorizationUrlSearchParams = await new URLSearchParams({
//             client_id: 'Iv1.6735dfbc776f34b5',
//             state
//             // params: { scope: "read:user user:email" },
//         });
//         const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
//         // redirect to authorization url
//         // console.log('URL ',authorizationUrl)
//         return new Response(null, {
//             status: 302,
//             headers: {
//                 Location: authorizationUrl
//             }
//         });
// }

// // import { getGitHubIdentity } from './github.ts'

// // const GET = getGitHubIdentity;