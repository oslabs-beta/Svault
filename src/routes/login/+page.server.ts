import { checkUserCredentials, createUser } from '$lib/server/db/index.ts';
//createSession not created yet
import { createSession } from '$lib/server/sessionStore/index.ts';
import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';

function performLogin(cookies: Cookies, username: string) {
  //default maxAge is 30 days, adjust to your needs
  const maxAge = 1000 * 60 * 60 * 24 * 30;
  const sid = createSession(username, maxAge);
  cookies.set('sid', sid, { maxAge });
}

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
        // create
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

    let goodUser = true;

    if (username && password) {
      await checkUserCredentials(username, password).then((res) => {
        console.log('res is ', res);
        if (res === false) {
          console.log('wrong password');
          goodUser = false;
        }
      });
    } else {
      //if someone logs in without a username or password
      return fail(400, { errorMessage: 'Missing username or password' });
    }

    if (goodUser !== true) {
      return fail(401, { errorMessage: 'Invalid username or password' });
    } else {
      //need to add this function
      performLogin(cookies, username);
      //redirect to home page
      throw redirect(303, '/');
    }
  },
};
