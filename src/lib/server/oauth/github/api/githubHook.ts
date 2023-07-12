import { getGitHubIdentity, getGitHubValidation } from '$lib/server/oauth/github/api/github.js';

export const gitHub = (clientId, clientSecret, path) => {
    return async ({ event, resolve }) => {
        if (event.url.pathname === '/oauth/github/api') {
            const provider = await getGitHubIdentity(clientId);
            return new Response('Redirect', { status: 302, headers: provider });
        } else if (event.url.pathname === '/oauth/api/validate') {
            const token = await getGitHubValidation(clientId, clientSecret, event);
            // TODO figure out what to do with token
            event.locals.token = token;
            return new Response('Redirect', { status: 303, headers: { Location: path } });
        }
        return await resolve(event);
    };
};