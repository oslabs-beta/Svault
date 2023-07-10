import { getGitHubIdentity, getGitHubValidation } from '$lib/server/oauth/github/api/github.ts';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

// TODO set handle and paths to be dynamic to providers


//set redirect path
const secret = '/secret'

export const handle = async ({ event, resolve }) => {
    //step 1 button points here and goes thru github.ts function. Pass in the client id
    if (event.url.pathname === '/oauth/github/api') {
        const provider = await getGitHubIdentity(GITHUB_CLIENT_ID);
        //provider returns the authorization url and now we redirect user to step 2 for validation and token
        return new Response('Redirect', { status: 302, headers: provider });
    } else if (event.url.pathname === '/oauth/api/validate') {
        // TODO try to remove cookie,url methods here and restrict them to provider file. 
        //get the cookies and the unique code given by github
        const storedState = event.cookies.get("github_oauth_state");
        const state = event.url.searchParams.get("state");
        const code = event.url.searchParams.get("code");
        //the validation function token will return the access token
        const token = await getGitHubValidation(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, storedState, state, code)
        //we can store on the event locals object the access token for the app user to do stuff with it
        event.locals.token = token;
        // console.log('token', token)
        //now that validation is complete they are redirected with the path they defined above, like /secret
        return new Response('Redirect', { status: 303, headers: { Location: secret } });
    }
    //end the hook
    return await resolve(event);
};
