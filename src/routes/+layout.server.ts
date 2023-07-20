// Used for development testing

// Imports type from sveltekit, only works when vite server is running
import type { LayoutServerLoad } from '/$types';

export const load = (async ({ locals }) => {
  const { username, failure } = locals;
  // TODO: add session data from event.locals when session functionality is complete
    //const { session } = locals;
  return await { username, failure };
}) satisfies LayoutServerLoad;
