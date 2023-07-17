import { SvaultNative } from "$lib/server/login/nativeAuth.ts";
import { SvaultOauth } from './lib/server/oauth/svaultoauth.ts'
import { github } from './lib/server/oauth/github/api/github.ts';
import { google } from './lib/server/oauth/google/api/google.ts';
import { discord } from "$lib/server/oauth/discord/api/discord.ts";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "$env/static/private";
import { sequence } from '@sveltejs/kit/hooks';


//set redirect path
const redirectPath = '/secret'
///google/discord callback urls have to match what callback url you setup in your development app
const googleCallback = 'http://localhost:5173/oauth/google/validate'
const discordCallback = 'http://localhost:5173/oauth/discord/validate'
//place the oauth providers here
const providers = [
    github(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, redirectPath),
    google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectPath, googleCallback),
    discord(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, redirectPath, discordCallback)
  ];
//svault ouath handler
export const oauth = SvaultOauth({ providers });

//svault native handler
export const native = SvaultNative(redirectPath);

export const handle = sequence(oauth, native);



