//uses createUser method from our server/db file. (currently we have no db connected, so that's why it is erroring)

import { checkUserCredentials, createUser } from '$lib/server/db/index.ts';
//createSession not created yet
//import { createSession } from '$lib/server/sessionStore';
import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';

//now these Actions will be available to the rest of the app
export const actions: Actions = {
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    //this was how the tutorial wrote it, but maybe we can use object destructuring instead here? see pseudocode on next line. we'd have to see what type of value 'data' is
    //const { username, password } = data;
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    console.log(username, password);

    if (username && password) {
      try {
        createUser(username, password);
      } catch (err) {
        return fail(400, { errorMessage: 'Internal Server Error' });
      }
    } else {
      return fail(400, { errorMessage: 'Missing username or password' });
    }
  },

  login: async ({ request, cookies }) => {
    const data = await request.formData();
    //const { username, password } = data;
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (username && password) {
      const res = await checkUserCredentials(username, password);

      if (!res) {
        return fail(401, { errorMessage: 'Invalid username or password' });
      }
      //need to add this function
      //performLogin(cookies, username);

      // redirect to home page
      throw redirect(303, '/');
    } else {
      return fail(400, { errorMessage: 'Missing username or password' });
    }
  },
};
