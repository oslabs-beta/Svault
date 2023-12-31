//master for all native login/register functions

import { type Handle } from '@sveltejs/kit';
import { checkUserCredentials, createUser } from '$lib/server/db/index.js';
import { createSession, getSession, deleteSession } from '$lib/server/sessionStore/index.js';
import { fail } from '@sveltejs/kit';
import { MAX_AGE } from '$env/static/private';


let checkUserStatus: boolean;

export const SvaultNative: Handle = (redirect: string) => {
  return async ({ event, resolve }) => {
      if (event.url.pathname.startsWith('/')) {
          if (checkUserStatus === false) {
                event.locals.failure = "Invalid username or password";
            } else {
                checkUserStatus = true;
            }
            //grab the session ID from the cookie, and get the session data for it
            const { cookies } = event;
            const sid = cookies.get('svault_auth');
            if (sid) {
                const session = getSession(sid);
                if (session) {
                    //sends username back to frontend to be used on the landing page
                    event.locals.username = session.username;
                    //TODO: send session info back
                    //event.locals.session = session;
                    //TODO/ITERATION: user roles on site 
                    // event.locals.roles = session.roles;
                } else {
                    // remove invalid/expired/unknown cookies
                    cookies.delete('svault_auth');
                }
            }
        }
        if (event.url.pathname === '/loginValidate') {
            const { goodUser, header } = await login(event, redirect);
            // const result = await login(event, redirect);
            if (goodUser === true) {
                checkUserStatus = true;
                return new Response('Redirect', { status: 303, headers: header });
            } else {
                checkUserStatus = false;
                return new Response(null, { status: 302, headers: header })
            }
        }
        if (event.url.pathname === "/registerValidate") {
            const newUser = await register(event);
            if (newUser.status === 200) {
                return new Response('Redirect', { status: 303, headers: { Location: '/login' } })
            } else {
                return new Response('error in register validation')
            }
        }
        if (event.url.pathname === '/logout') {
            const { cookies } = event;
            const sid = cookies.get('svault_auth');
            if (sid) {
                cookies.delete('svault_auth');
                deleteSession(sid)
            }
            return new Response('Redirect', { status: 303, headers: { Location: '/' } })
        }
        return await resolve(event);
    }
}


//invoked when a username/password is authenticated to TRUE
export function makeCookieAndSession(username: string, redirect: string) {
    const maxAge = eval(MAX_AGE)
    const sid = createSession(username, maxAge);
    const cookieHeader = `svault_auth=${sid}; HttpOnly; Max-Age=${maxAge}; Path=/`;
    const headers = new Headers();
    headers.append('Set-Cookie', cookieHeader);
    headers.append('Location', redirect);
    headers.append('maxAge', `${maxAge}`);
    return headers;
}

//register
export const register = async (event) => {
    // obtains form data when user clicks "register" button
    const data = await event.request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
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
export const login = async (event, redirect: string) => {
    //obtains form data when user clicks "login" button

    const data = await event.request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    let goodUser: boolean;
    goodUser = true;
    let header = new Headers();
    let errorMessage: string;

    if (username && password) {
        //checks username/password in database
        const response = await checkUserCredentials(username, password);
        if (response === false) {
            goodUser = false;
            errorMessage = 'Invalid username or password';
        }
    } else {
        //if someone logs in without a username or password
        //should never happen because they are required form data points in page.svelte
        goodUser = false;
        // return fail(400, { errorMessage: 'Missing username or password' });
        errorMessage = 'Missing username or password';
    }

    //workaround if username/password do not match
    if (goodUser !== true) {
        //const header = new Headers()
        header.append('Location', '/login')
        header.append('fail', { 'errorMessage': `${errorMessage}` });
    } else {
        header = makeCookieAndSession(username, redirect);
    }
    return { goodUser, header };
}