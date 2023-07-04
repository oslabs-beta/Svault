//imports type from sveltekit, only works when vite server is running
import type { LayoutServerLoad } from '/$types';

export const load = (async ({ locals }) => {
  const { username } = locals;
  console.log(username);
  return { username };
}) satisfies LayoutServerLoad;
