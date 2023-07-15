// USED FOR DEVELOPMENT TESTING

import { SvaultNative } from "$lib/server/login/nativeAuth.ts";
const redirect = '/secret';
export const handle = SvaultNative(redirect);
