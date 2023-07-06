//Now that the users have a session cookie, and we have a store that records which session belongs to which user, we might want to use this info in some of our components
// import { getSession } from './lib/server/sessionStore/index.ts';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({event, resolve}) => {
  //grab the session ID from the cookie, and get the session data for it
  const {cookies} = event;
  const sid = cookies.get('sid');
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

  const response = await resolve(event);
  return response;
}) satisfies Handle;