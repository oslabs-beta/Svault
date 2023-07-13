import { nanoid } from 'nanoid';


export const github = (clientId, clientSecret, path) => {
    return async ({ event, resolve }) => {
        if (event.url.pathname === '/oauth/github/api') {
            const provider = await getGitHubIdentity(clientId);
            return new Response('Redirect', { status: 302, headers: provider });
        } else if (event.url.pathname === '/oauth/api/validate') {
            const token = await getGitHubValidation(clientId, clientSecret, event);
            // TODO figure out what to do with token
            event.locals.token = token;
            return new Response('Redirect', { status: 303, headers: { Location: path } });
        }
        return await resolve(event);
    };
};


export async function getGitHubIdentity(client_id: string, cookieSetter?: any, maxAge?: number,): Promise<any> {
  const state = nanoid();
  const cookieHeader = `github_oauth_state=${state}; HttpOnly; Max-Age=3600; Path=/`;
  const authorizationUrlSearchParams = await new URLSearchParams({
    client_id: client_id,
    state,
    params: { scope: "read:user user:email" },
  });
  const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
  const headers = new Headers();
  headers.append('Set-Cookie', cookieHeader);
  headers.append('Location', authorizationUrl);
  return headers
}
export async function getGitHubValidation(client_id: string, client_secret: string, event) {
  const storedState = event.cookies.get("github_oauth_state");
  const state = event.url.searchParams.get("state");

  if (!storedState || !state || storedState !== state) {
    return new Response(null, {
      status: 400
    });
  }
  const code = event.url.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400
    });
  }
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: client_id,
      client_secret: client_secret,
      code
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
  // console.log('val response', response)
  const result = await response.json() as { access_token: string }
  // console.log('val result',result)
  const accessToken = result.access_token

  // do stuff with access token
  // return some response
  //TODO good practice to store refresh token with github username to db?
  return accessToken
}




