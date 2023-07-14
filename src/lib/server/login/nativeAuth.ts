//master for all native login/register functions

import type { Handle, Cookies } from '@sveltejs/kit';
import { checkUserCredentials, createUser } from '$lib/server/db/index.ts';
import { createSession } from '$lib/server/sessionStore/index.ts';
import { fail, redirect } from '@sveltejs/kit';

//TODO cookie functionality
  //grab the session ID from the cookie, and get the session data for it
//   const {cookies} = event;
//   const sid = cookies.get('sid');
//   if (sid) {
//       const session = getSession(sid);
//       if (session) {
//           event.locals.username = session.username;
//           // event.locals.roles = session.roles;
//       } else {
//           // remove invalid/expired/unknown cookies
//           cookies.delete('sid');
//       }
//   }

//Hook master
//TODO setup login after registering
export const SvaultNative = (redirect) => {
    return async ({ event, resolve }) => {

        if (event.url.pathname === '/loginValidate') {
            const { goodUser, header } = await login(event, redirect);
            // console.log('goodUser is:', goodUser);
            console.log(`header is: ${header}`);
            //return new Response('Redirect', { status: 303, headers: header});
  
            if (goodUser === true) {
                return new Response('Redirect', { status: 303, headers: header });
            } else {
                //return fail(400, { errorMessage: 'Missing username or password' })
                return new Response('error in login validation')
            }
        }
        if (event.url.pathname === "/registerValidate") {
            const newUser = await register(event);
            // console.log(newUser)
            if (newUser.status === 200) {
                // console.log('status good now login')
                // console.log('event', event)
                // const isUser = await login(event);
                // console.log('isUser', isUser)
                // if (isUser === true) {
                //     console.log('Inside register, if statement for login')
                //     return new Response('Redirect', { status: 303, headers: { Location: redirect } });
                // } else {
                //     return new Response('error in login validation')
                // }
                return new Response('Redirect', { status: 303, headers: { Location: redirect } })
            } else {
                return new Response('error in register validation')
            }
        }
        return await resolve(event);
    }
}


//invoked when a username/password is authenticated to TRUE
export function makeCookieAndSession(cookies: Cookies, username: string, redirect) {
  // TODO - have the user have control over the session expiration time
  const maxAge = Date.now() + 1000 * 60 * 60;
  const sid = createSession(username, maxAge);
  console.log('cookies in makeCookieAndSession:', cookies)
  //return sid;

  const cookieHeader = `native_auth=${sid}; HttpOnly; Max-Age=${maxAge}; Path=/`;
  const headers = new Headers();
  headers.append('Set-Cookie', cookieHeader);
  headers.append('Location', redirect);
  return headers;
//   cookies.set('sid', sid, { maxAge });
}

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
            return new Response({ status: 201 })
        } catch (err) {
            return fail(400, { errorMessage: 'Internal Server Error' });
        }
    } else {
        //should never be evaluated because both form boxes are "required" in page.svelte
        return fail(400, { errorMessage: 'Missing username or password' });
    }
}

//login
export const login = async (event, redirect, cookies?) => {
    //obtains form data when user clicks "login" button
    const data = await event.request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    //console.log('data', username, password)
    let goodUser = true;

    if (username && password) {
        //checks username/password in database
        await checkUserCredentials(username, password).then((res) => {
            // console.log('res is ', res);
            //could not RETURN out of this await statement, needed to go in outer scope, so we declare goodUser as false here and throw the fail() outside of await statement
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
        //username and password are correct--> keep logged in via cookies and sessions
        // event.cookies.set(
        //     'auth', '42',
        //     {
        //         path: '/',
        //         maxAge: 60 * 60 * 24 * 365,
        //         httpOnly: false, // <-- if you want to read it in the browser
        //     },
        // );
        // event.cookies.set('sid', '523rtw43ttt', 1234565432);
        const header = makeCookieAndSession(cookies, username, redirect);
        // console.log(header)
        // removed goodUser from return statement (1)
        return { goodUser, header };
    }
}