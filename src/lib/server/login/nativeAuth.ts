//master for all native login/register functions

import type { Handle } from '@sveltejs/kit';
import { checkUserCredentials, createUser } from '$lib/server/db/index.ts';
//import { createSession } from '$lib/server/sessionStore/index.ts';
import { fail } from '@sveltejs/kit';

//TODO cookie functionality
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

//Hook master
export const SvaultNative: Handle = (async (redirect, { event, resolve }) => {
  if (event.url.pathname === '/loginValidate') {
    const isUser = await login(event);
    if (isUser === true) {
      return new Response('Redirect', { status: 303, headers: { Location: redirect } });
    } else {
      return new Response('error in login validation')
    }
  }
  if(event.url.pathname === "/registerValidate"){
    const newUser = await register(event);
    console.log(newUser)
    if(newUser.status === 200){
      console.log('status good redirect')
      return new Response('Redirect', { status: 303, headers: { Location: redirect } })
    }else{
      return new Response('error in register validation')
    }
  }
  return await resolve(event);
}) satisfies Handle;



// TODO - Deal with MaxAge equation issues

//invoked when a username/password is authenticated to TRUE
// function performLogin(cookies: Cookies, username: string) {
//   //default maxAge is 30 days, adjust to your needs
//   const maxAge = Date.now() * 30;
//   const sid = createSession(username, maxAge);
//   cookies.set('sid', sid, { maxAge });
// }

//register
export const register = async (event) => {
  // obtains form data when user clicks "register" button
  const data = await event.request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  console.log(username, password);

  if (username && password) {
    try {
      await createUser(username, password);
      //status not sending back -- defaults to 200
      return new Response({status: 201})
    } catch (err) {
      return fail(400, { errorMessage: 'Internal Server Error' });
    }
  } else {
    //should never be evaluated because both form boxes are "required" in page.svelte
    return fail(400, { errorMessage: 'Missing username or password' });
  }
}

//login
export const login = async (event) => {
  //obtains form data when user clicks "login" button
  const data = await event.request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  console.log('data', username, password)
  let goodUser = true;

  if (username && password) {
    //checks username/password in database
    await checkUserCredentials(username, password).then((res) => {
      // console.log('res is ', res);
      //could not RETURN out of this await statement, needed to go in outer scope, so we dealre goodUser as false here and throw the fail() outside of await statement
      if (res === false) {
        console.log('wrong password');
        goodUser = false;
      }
    });
  } else {
    //if someone logs in without a username or password
    //should never happen because they are required form data points in page.svelte
    return fail(400, { errorMessage: 'Missing username or password' });
  }

  //workaround if username/password do not match
  if (goodUser !== true) {
    return fail(401, { errorMessage: 'Invalid username or password' });
  } else {
    //username and password are correct--> perform login
    //performLogin(cookies, username);
    return goodUser;
    // performLogin(cookies, username);
    // throw redirect(303, '/');
  }
}