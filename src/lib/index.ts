import GithubButton from './components/GithubButton.svelte';
export { GithubButton }
import GoogleButton from './components/GoogleButton.svelte';
export { GoogleButton }
// import FacebookButton from './components/FacebookButton.svelte';
// export { FacebookButton }


export { google } from './server/oauth/google/api/google.js'
// export { facebook } from './server/oauth/facebook/api/facebook.js'
export { github } from './server/oauth/github/api/github.js';
// Reexport your entry components here
export { SvaultNative } from '$lib/server/login/nativeAuth.js'
