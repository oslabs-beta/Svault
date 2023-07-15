import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { Handle, Cookies } from '@sveltejs/kit';





export const SvaultLogout = (redirect) => {
    return async ({ event, resolve }) => {
        console.log('trying to log out')
        if (event.url.pathname === ('/logout')) {
            const { cookies } = event;
            const sid = cookies.get('sid');
            if (sid) {
              cookies.delete('svault_native');
              // include the cookies.delete for oauth name
            }
          
            throw redirect(303, '/'); 
        }

        //   satisfies PageServerLoad;

    }
}



