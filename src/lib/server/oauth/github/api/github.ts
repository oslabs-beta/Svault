import { nanoid } from 'nanoid';

//TODO cleanup code

//Custom hanndle hook for github to authenticate, validate, redirect, and return the github user email
//Set github callback URL to /oauth/api/validate
// let userMain;
export const github = (clientId, clientSecret, redirectPath) => {
  return {
    name: 'github',
    authPath: '/oauth/github/auth',
    validatePath: '/oauth/github/validate',
    getAuthIdentity: () => {
      const provider = getGitHubIdentity(clientId);
      return provider;
    },
    getValidation: async (event) => {
      const token = await getGitHubValidation(clientId, clientSecret, event);
      return token;
    },
    getUser: async (token) => {
      const user = await getUser(token);
      return user;
    },
    redirectPath,
  };
};

//set state as cookie and get authorization headers to github
export function getGitHubIdentity(client_id: string): Promise<any> {
  const state = nanoid();
  const cookieHeader = `github_oauth_state=${state}; HttpOnly; Max-Age=3600; Path=/`;
  const authorizationUrlSearchParams = new URLSearchParams({
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
  const result = await response.json() as { access_token: string };
  const accessToken = result.access_token;
  return accessToken;
}


//get github user email with access token and return the user email to event.locals.user
export async function getUser(accessToken) {
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
        if (el.primary === true) {
          useremail = el.email;
          break;
        }
      }
    } else {
      useremail = user.email;
    }
    return useremail;
  } catch (error) {
    return new Response(null, {
      status: 400
    });
  }
}