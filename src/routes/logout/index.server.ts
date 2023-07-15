//import { deleteSession } from '$lib/server/sessionStore/index.ts';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';


/* TODO: LOGOUT FUNCTIONALITY
    Connects to the ../+page.svelte functionality beginning on line 37
*/
export const load = (({ cookies }) => {
  const sid = cookies.get('sid');
  if (sid) {
    //cookies.delete('sid');
    //deleteSession(sid);
  }

  throw redirect(303, '/');
}) satisfies PageServerLoad;