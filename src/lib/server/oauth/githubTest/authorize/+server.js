import { dev } from '$app/environment';
import { nanoid } from 'nanoid';


//import { GITHUB_CLIENT_ID } from '$env/static/private';

//export const Oauth = () => {
    //console.log('in Oauth')

    export const GET = async ({cookies}) => {
        console.log('GET function in auth/server.ts has been run');
        const state = nanoid(); // I recommend using nanoid
        cookies.set("github_oauth_state", state, {
            httpOnly: true,
            secure: !dev, // disable when using localhost
            maxAge: 60 * 60, // 1 hour expiry,
            path: "/"
    
        });
        const authorizationUrlSearchParams = new URLSearchParams({
            client_id: 'Iv1.6735dfbc776f34b5',
            state
            // params: { scope: "read:user user:email" },
        });
    
        const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
        // redirect to authorization url
        return new Response(null,{
            
            status: 302,
            headers: {
                Location: authorizationUrl
            }
        });
     } 
     //return GET;
//}

// export const GET = async ({ cookies }) => {
//     console.log('GET function in auth/server.ts has been run');
//     const state = nanoid(); // I recommend using nanoid
//     cookies.set("github_oauth_state", state, {
//         httpOnly: true,
//         secure: !dev, // disable when using localhost
//         maxAge: 60 * 60, // 1 hour expiry,
//         path: "/"

//     });
//     const authorizationUrlSearchParams = new URLSearchParams({
//         client_id: GITHUB_CLIENT_ID,
//         state
//         // params: { scope: "read:user user:email" },
//     });
//     const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
//     // redirect to authorization url
//     return new Response(null, {
//         status: 302,
//         headers: {
//             Location: authorizationUrl
//         }
//     });
// }