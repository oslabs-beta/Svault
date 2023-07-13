import { checkUserCredentials, createUser } from '$lib/server/db/index.ts';
//import { createSession } from '$lib/server/sessionStore/index.ts';
import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';

// TODO - Deal with MaxAge equation issues

//invoked when a username/password is authenticated to TRUE
// function performLogin(cookies: Cookies, username: string) {
//   //default maxAge is 30 days, adjust to your needs
//   const maxAge = Date.now() * 30;
//   const sid = createSession(username, maxAge);
//   cookies.set('sid', sid, { maxAge });
// }

// console.log('in library login.ts')
//now these Actions will be available to the rest of the app
// ----------ORIGINAL-------------
// export const actions = {
//   //TODO: do we need to add creation of a cookie here, or should we delete?
  // register: async ({ request, cookies }) => {
  //   obtains form data when user clicks "register" button
  //   const data = await request.formData();
  //   const username = data.get('username')?.toString();
  //   const password = data.get('password')?.toString();
  //   console.log(username, password);
  //   console.log(request)

  //   if (username && password) {
  //     try {
  //       createUser(username, password);
  //     } catch (err) {
  //       return fail(400, { errorMessage: 'Internal Server Error' });
  //     }
  //   } else {
  //     //should never be evaluated because both form boxes are "required" in page.svelte
  //     return fail(400, { errorMessage: 'Missing username or password' });
  //   }
  // },

//   login: async (username: string, password: string) => {
//     console.log('Im inside the login method in actions')
//     console.log('username is:', username, 'password is:', password)
//     //obtains form data when user clicks "login" button
//     // const data = await request.formData();
//     // const username = data.get('username')?.toString();
//     // const password = data.get('password')?.toString();

//     let goodUser = true;

//     if (username && password) {
//       //checks username/password in database
//       await checkUserCredentials(username, password).then((res) => {
//         console.log('res is ', res);
//         //could not RETURN out of this await statement, needed to go in outer scope, so we dealre goodUser as false here and throw the fail() outside of await statement
//         if (res === false) {
//           console.log('wrong password');
//           goodUser = false;
//         }
//       });
//     } else {
//       //if someone logs in without a username or password
//       //should never happen because they are required form data points in page.svelte
//       return fail(400, { errorMessage: 'Missing username or password' });

//     //    return new Response(null, {
//     //   status: 400
//     // });
//     }

//     //workaround if username/password do not match
//     if (goodUser !== true) {
//       return fail(401, { errorMessage: 'Invalid username or password' });
//     } else {
//       //username and password are correct--> perform login
//       //performLogin(cookies, username);

//       //redirect to home page
//       throw redirect(303, '/');
//     }
//   },
// };
//----------ORIGINAL END------------




export const register = async (event) => {
  // obtains form data when user clicks "register" button
  const data = await event.request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  console.log(username, password);

  if (username && password) {
    try {
      await createUser(username, password);
      //status not sending back -- defaults to 200
      return new Response({status: 201})
    } catch (err) {
      return fail(400, { errorMessage: 'Internal Server Error' });
    }
  } else {
    //should never be evaluated because both form boxes are "required" in page.svelte
    return fail(400, { errorMessage: 'Missing username or password' });
  }
}

//working login
export const login = async (event) => {
  //obtains form data when user clicks "login" button
  const data = await event.request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  console.log('data', username, password)
  let goodUser = true;

  if (username && password) {
    //checks username/password in database
    await checkUserCredentials(username, password).then((res) => {
      // console.log('res is ', res);
      //could not RETURN out of this await statement, needed to go in outer scope, so we dealre goodUser as false here and throw the fail() outside of await statement
      if (res === false) {
        console.log('wrong password');
        goodUser = false;
      }
    });
  } else {
    //if someone logs in without a username or password
    //should never happen because they are required form data points in page.svelte
    return fail(400, { errorMessage: 'Missing username or password' });

    //    return new Response(null, {
    //   status: 400
    // });
  }

  //workaround if username/password do not match
  if (goodUser !== true) {
    return fail(401, { errorMessage: 'Invalid username or password' });
  } else {
    //username and password are correct--> perform login
    //performLogin(cookies, username);

    return goodUser;
    // performLogin(cookies, username);
    // throw redirect(303, '/');
  }
}