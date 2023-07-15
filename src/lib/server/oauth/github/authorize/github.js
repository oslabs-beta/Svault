import { dev } from '$app/environment';
import { nanoid } from 'nanoid';
import { redirect } from '@sveltejs/kit';




export const github = async ({ context }) => {
  // console.log('GET function in auth/server.ts has been run');
  const state = nanoid(); // I recommend using nanoid

  const cookieHeader = `github_oauth_state=${state}; HttpOnly; ${!dev ? 'Secure; ' : ''}Max-Age=3600; Path=/`;
  // console.log(cookieHeader);
  const headers = new Headers({ 'Set-Cookie': cookieHeader });
  // console.log('Headers', headers);
  const authorizationUrlSearchParams = await new URLSearchParams({
    client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
    state,
    // params: { scope: "read:user user:email" },
  });

  const authorizationUrl = await `https://github.com/login/oauth/authorize?${authorizationUrlSearchParams}`;
  console.log('The URL is here ', authorizationUrl);
  // redirect to authorization url
  headers.set('Location', authorizationUrl);

  if(context){
    context.status = 302;
    context.headers = {
    Location: authorizationUrl,
    };
  }
  

  return {
    status: 302,
    headers: {
      Location: authorizationUrl,
    },
  };


};

  // export const callback = async ({ request, url }) => {
  //   console.log('Callback function in auth/server.ts has been run');
  //   const storedState = request.headers.get('Cookie').split('github_oauth_state=')[1];
  //   const state = url.searchParams.get('state');
  
  //   if (!storedState || !state || storedState !== state) {
  //     return new Response(null, { status: 400 });
  //   }
  
  //   const code = url.searchParams.get('code');
  
  //   if (!code) {
  //     return new Response(null, { status: 400 });
  //   }
  
  //   const response = await fetch('https://github.com/login/oauth/access_token', {
  //     method: 'POST',
  //     body: new URLSearchParams({
  //       client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
  //       client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
  //       code,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Accept: 'application/json',
  //     },
  //   });
  
  //   if (!response.ok) {
  //     console.log('Response was NOT okay');
  //     return new Response(null, { status: 400 });
  //   }
  
  //   const result = await response.json();
  //   const accessToken = result.access_token;
  //   console.log('Token:', result);
  
  //   // Do something with the access token
  
  //   // Return a response
  //   return new Response(null, {
  //       status: 303,
  //       headers: {
  //           Location: '/secrets',
  //       }
  //   } );
  // };
   