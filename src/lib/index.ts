// Reexport your entry components here
// import OAuth from './server/oauth/+page.svelte'
// import { github } from './server/oauth/github/authorize/github.js'
import  LoginBox  from './components/LoginBox.svelte'
// import { getGitHubIdentity, getGitHubValidation } from './server/oauth/github/api/github.ts'
export { LoginBox }
export {  getGitHubIdentity, getGitHubValidation } from './server/oauth/github/api/github.js'
// export { OAuth };
// export { github };