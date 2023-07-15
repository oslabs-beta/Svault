import { nanoid } from 'nanoid';
import { redirect } from '@sveltejs/kit';
//TODO cleanup code

//Custom hanndle hook for github to authenticate, validate, redirect, and return the github user email
//Set github callback URL to /oauth/api/validate
export const github = (clientId, clientSecret, path) => {
  return async ({ event, resolve }) => {
    //authorization endpoint to github
    if (event.url.pathname === '/oauth/github/api') {
      const provider = await getGitHubIdentity(clientId);
      return new Response('Redirect', { status: 302, headers: provider });
      //github callback enters here
    } else if (event.url.pathname === '/oauth/api/validate') {
      //if authorization on github request cancelled return to '/'
      const url = new URL(event.request.url);
      const error = url.searchParams.get('error');
      if (error === 'access_denied') {
        throw redirect(302, '/');
      }
      //Upon validationn completetion return access token
      const token = await getGitHubValidation(clientId, clientSecret, event);
      //Use access token to request user's github primary email address
      const user = await getUser(token, event);
      if (user !== undefined) {
        return new Response('Redirect', { status: 303, headers: { Location: path } });
      } else {
        return new Response('error in authorizing github user');
      }
    }
    return await resolve(event);
  };
};

//set state as cookie and get authorization headers to github
export async function getGitHubIdentity(client_id: string, cookieSetter?: any, maxAge?: number,): Promise<any> {
  const state = nanoid();
  const cookieHeader = `github_oauth_state=${state}; HttpOnly; Max-Age=3600; Path=/`;
  const authorizationUrlSearchParams = await new URLSearchParams({
    client_id: client_id,
    state,
    scope: "read:user, user:email",
  });
  const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
  const headers = new Headers();
  headers.append('Set-Cookie', cookieHeader);
  headers.append('Location', authorizationUrl);
  return headers;
}

//check state cookie and fetch access token
export async function getGitHubValidation(client_id: string, client_secret: string, event) {
  const storedState = event.cookies.get("github_oauth_state");
  const state = event.url.searchParams.get("state");

  if (!storedState || !state || storedState !== state) {
    return new Response(null, {
      status: 400,
    });
  }
  const code = event.url.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: client_id,
      client_secret: client_secret,
      code,
      scope: "read:user, user:email",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    console.log('Response was NOT okay');
    return new Response(null, {
      status: 400
    });
  }
  const result = await response.json() as { access_token: string }
  const accessToken = result.access_token
  return accessToken;
}

//get github user email with access token and return the user email to event.locals.user
export async function getUser(accessToken, event) {
  try {
    let useremail;
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `bearer ${accessToken}`,
      },
    });

    const user = await response.json();

    if (!user.email) {
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `bearer ${accessToken}`,
        },
      });

      const data = await emailResponse.json();

      for (const el of data) {
        console.log('Inside For loop, el: ', el)
        if (el.primary === true) {
          useremail = el.email;
          break;
        }
      }
    } else {
      useremail = user.email;
    }

    event.locals.user = useremail;

    return useremail;
  } catch (error) {
    return new Response(null, {
      status: 400
    });
  }
}