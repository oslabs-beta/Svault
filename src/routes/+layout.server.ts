//imports type from sveltekit, only works when vite server is running
import type { LayoutServerLoad } from '/$types';

export const load = (async ({ locals }) => {
  console.log(locals)
  const { username, session } = locals;
  //console.log(username);
  return { username, session };
}) satisfies LayoutServerLoad;
