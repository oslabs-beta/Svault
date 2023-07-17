// used for development testing

//imports type from sveltekit, only works when vite server is running
import type { LayoutServerLoad } from '/$types';

export const load = (async ({ locals }) => {
  const { username, session, failure } = locals;
  console.log('layout locals is:', failure)
  return await { username, session, failure };
}) satisfies LayoutServerLoad;
