//Now that the users have a session cookie, and we have a store that records which session belongs to which user, we might want to use this info in some of our components
// import { getSession } from './lib/server/sessionStore/index.ts';
// import { register, login } from "$lib/server/login/login.ts"
import { SvaultNative } from "$lib/server/login/nativeAuth.ts";
// import type { Handle } from '@sveltejs/kit';
// import { redirect } from '@sveltejs/kit';

// import type { form } from '$routes/login/'

// export const handle = (async ({event, resolve}) => {
//   //get login route
//   // console.log('event is:', event);

//   // if (event.url.pathname === '/register') {
//   //   // //const formData = 

//   // }
//   if (event.url.pathname === '/login') {
//     console.log('hook login')
//     // console.log(FormData)
//     // console.log ({ username: event.locals.username, password: event.locals.password })
//     // console.log('here is log in function:', actions.login)
//     console.log(event)
//         const data = await event.request.formData();
//         const username = data.get('username')?.toString();
//         const password = data.get('password')?.toString();
//         console.log(username, password)
//     // console.log(values)
//   }

//   //grab the session ID from the cookie, and get the session data for it
//   const {cookies} = event;
//   const sid = cookies.get('sid');
// //   if (sid) {
// //       const session = getSession(sid);
// //       if (session) {
// //           event.locals.username = session.username;
// //           // event.locals.roles = session.roles;
// //       } else {
// //           // remove invalid/expired/unknown cookies
// //           cookies.delete('sid');
// //       }
// //   }

//   const response = await resolve(event);
//   return response;
// }) satisfies Handle;

//

const redirect = '/secret'
export const SvaultNative(redirect)


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
