import GithubButton from './components/GithubButton.svelte';
export { GithubButton };
import GoogleButton from './components/GoogleButton.svelte';
export { GoogleButton };
import DiscordButton from './components/DiscordButton.svelte';
export { DiscordButton };


export { google } from './server/oauth/google/api/google.js'
export { github } from './server/oauth/github/api/github.js';
export { discord } from './server/oauth/discord/api/discord.js';
export { SvaultOauth } from './server/oauth/svaultoauth.js';
export { SvaultNative } from '$lib/server/login/nativeAuth.js';
