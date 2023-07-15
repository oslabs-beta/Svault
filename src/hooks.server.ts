import { github } from './lib/server/oauth/github/api/github.ts';
import { google } from './lib/server/oauth/google/api/google.ts';
import { facebook } from './lib/server/oauth/facebook/api/facebook.ts';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';


//set redirect path
const redirectPath = '/secret'
///google callback url has to match what callback url you setup in your google app
const googleCallback = 'http://localhost:5173/oauth/google/validate'
export const first = google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectPath, googleCallback)
export const second = github(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, redirectPath)
export const third = facebook(FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, redirectPath)

export const handle = sequence(first, second, third);



