let userMain;
export const SvaultOauth = ({ providers }) => {
    return async ({ event, resolve }) => {
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
      if (event.url.pathname === '/logout') {
        const { cookies } = event;
        for (const provider of providers) {
            console.log(provider.name)
          cookies.delete(`${provider.name}_oauth_state`);
        }
        // You can add additional logic here, such as redirecting the user to a specific page after logout
        return new Response('Logout Successful');
      }
      for (const provider of providers) {
        if (event.url.pathname === provider.authPath) {
          const authProvider = provider.getAuthIdentity();
          return new Response('Redirect', { status: 302, headers: authProvider });
        } else if (event.url.pathname === provider.validatePath) {
          const token = await provider.getValidation(event);
          const user = await provider.getUser(token);
          if (user !== undefined) {
            userMain = user;
            return new Response('Redirect', { status: 303, headers: { Location: provider.redirectPath } });
          } else {
            return new Response(`Error in authorizing ${provider.name} user`);
          }
        }
      }
      return await resolve(event);
    };
  };
  
