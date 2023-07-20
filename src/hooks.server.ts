import { SvaultNative } from "$lib/server/login/nativeAuth.ts";
import { SvaultOauth } from './lib/server/oauth/svaultoauth.ts';
import { github } from './lib/server/oauth/github/api/github.ts';
import { google } from './lib/server/oauth/google/api/google.ts';
import { discord } from "$lib/server/oauth/discord/api/discord.ts";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "$env/static/private";
import { sequence } from '@sveltejs/kit/hooks';


// Set redirect path
const redirectPath = '/secret';
/// Google/Discord callback urls have to match what callback url you setup in your development app
const googleCallback = 'http://localhost:5173/oauth/google/validate';
const discordCallback = 'http://localhost:5173/oauth/discord/validate';
// Place the oauth providers here
const providers = [
  github(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, redirectPath),
  google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectPath, googleCallback),
  discord(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, redirectPath, discordCallback)
];
// Svault oauth handler
export const oauth = SvaultOauth({ providers });

// Svault native handler
export const native = SvaultNative(redirectPath);

// Svault oauth and native handler
export const handle = sequence(oauth, native);



