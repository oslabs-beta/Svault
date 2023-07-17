// USED FOR DEVELOPMENT TESTING

import { SvaultNative } from "$lib/server/login/nativeAuth.ts";
import {SvaultOauth} from './lib/server/oauth/svaultoauth.ts'
import { github } from './lib/server/oauth/github/api/github.ts';
import { google } from './lib/server/oauth/google/api/google.ts';

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

import { sequence } from '@sveltejs/kit/hooks';


//set redirect path
const redirectPath = '/secret'
///google callback url has to match what callback url you setup in your google app
const googleCallback = 'http://localhost:5173/oauth/google/validate'
//place the oauth providers here
const providers = [
    github(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, redirectPath),
    google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectPath, googleCallback),
  ];
//main svault ouath handler
export const oauth = SvaultOauth({ providers });

//native handling
export const native = SvaultNative(redirectPath);

export const handle = sequence(oauth, native);



