//Now that the users have a session cookie, and we have a store that records which session belongs to which user, we might want to use this info in some of our components
// import { getSession } from './lib/server/sessionStore/index.ts';
// import { register, login } from "$lib/server/login/login.ts"
import { SvaultNative } from "$lib/server/login/nativeAuth.ts";
const redirect = '/secret'
export const handle = SvaultNative(redirect)

// export const handle = (async ({ event, resolve }) => {

//   if (event.url.pathname === '/loginValidate') {
//     const isUser = await login(event);
//     if (isUser === true) {
//       return new Response('Redirect', { status: 303, headers: { Location: '/secret' } });
//     } else {
//       return new Response('error in login validation')
//     }
//   }
//   if(event.url.pathname === "/registerValidate"){
//     const newUser = await register(event);
//     console.log(newUser)
//     if(newUser.status === 200){
//       console.log('status good redirect')
//       return new Response('Redirect', { status: 303, headers: { Location: '/secret' } })
//     }else{
//       return new Response('error in register validation')
//     }
//   }
//   return await resolve(event);
// }) satisfies Handle;
