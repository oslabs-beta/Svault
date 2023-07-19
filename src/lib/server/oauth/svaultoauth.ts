import { type Handle } from '@sveltejs/kit';
let userMain;
export const SvaultOauth: Handle = ({ providers }) => {
  return async ({ event, resolve }) => {
    //login user check    
    if (event.url.pathname.startsWith('/')) {
      const { cookies } = event;
      for (const provider of providers) {
        const sid = cookies.get(`${provider.name}_oauth_state`);
          if (sid) {
            event.locals.username = userMain;
            break;
          }
      }
    }
    //logout 
    if (event.url.pathname === '/logout' && event.cookies.get('svault_auth') === undefined) {
      let deleteCookieResponse;
      for (const provider of providers) {
        const cookieName = `${provider.name}_oauth_state`;
        const sid = event.cookies.get(cookieName);
        if (sid) {
          const deleteCookieHeader = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
          deleteCookieResponse = new Response('Logging Out...', { status: 303, headers: { Location: '/' } });
          deleteCookieResponse.headers.append('Set-Cookie', deleteCookieHeader);
        }
      }
      return deleteCookieResponse;
    }

    //run oauth steps
    for (const provider of providers) {
      if (event.url.pathname === provider.authPath) {
        const authProvider = provider.getAuthIdentity();
        return new Response('Redirect', { status: 302, headers: authProvider });
      } else if (event.url.pathname === provider.validatePath) {
        const token = await provider.getValidation(event);
        const user = await provider.getUser(token);
        if (user !== undefined) {
          //TODO: here is where we will make the Oauth session
          userMain = user.username;
          return new Response('Redirect', { status: 303, headers: { Location: provider.redirectPath } });
        } else {
            return new Response(`Error in authorizing ${provider.name} user`);
        }
      }
    }
    return await resolve(event);
  };
};

