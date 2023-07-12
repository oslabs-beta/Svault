// import { getGitHubIdentity, getGitHubValidation } from '$lib/server/oauth/github/api/github.ts';
import { gitHub } from './lib/server/oauth/github/api/githubHook.ts';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

//set redirect path
const redirectPath = '/secret'
export const handle = gitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, redirectPath)


