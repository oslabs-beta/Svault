// Reexport your entry components here
import OAuth from './server/oauth/+page.svelte'
import { github } from './server/oauth/github/authorize/github.js'
export { OAuth };
export { github };