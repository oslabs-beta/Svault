import { nanoid } from 'nanoid';



export async function getGitHubIdentity(client_id: string, cookieSetter?: any, maxAge?: number,): Promise<any> {
  const state = nanoid();
  // console.log('in githubts')/
  // cookieSetter("github_oauth_state", state, {
  //   httpOnly: true,
  //   // secure: !dev, // disable when using localhost
  //   maxAge: maxAge ? maxAge : 60 * 60, // 1 hour expiry,
  //   path: "/"
  // });

  const authorizationUrlSearchParams = await new URLSearchParams({
    client_id: client_id,
    state,
    // params: { scope: "read:user user:email" },
  });
  const authorizationUrl = `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
  const response = await fetch(authorizationUrl, {mode: 'no-cors'});
  console.log(`Response after making get request to ${authorizationUrl} is:`, response);
  // if (!response.status = 200) {
  //   console.log(`Our GET to ${authorizationUrl} failed`);
  // }

  return {
    status: 302,
    headers: {
        Location: authorizationUrl
    }
  };
}




