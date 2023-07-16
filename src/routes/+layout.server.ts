// used for development testing

//imports type from sveltekit, only works when vite server is running
import type { LayoutServerLoad } from '/$types';

export const load = (async ({ locals }) => {
  const { username, session } = locals;
  console.log('layout locals is:', username)
  return await { username, session };
}) satisfies LayoutServerLoad;
