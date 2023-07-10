<script lang ='ts'>
//   import { getGitHubIdentity } from './github/authorize/github.ts'
//   import { getContext } from 'svelte';
//   import { goto } from '$app/navigation';
//   const context = getContext('$app');

//  const getGit = getGitHubIdentity('Iv1.6735dfbc776f34b5');
//   const handleClick = async () => {
//     try {
//   //     const response = await github({ context });
//       const response = await getGitHubIdentity('Iv1.6735dfbc776f34b5')
//       // console.log('response in page.svelte:', response)
//       // console.log('hi')
//       goto(response.headers.Location);
      
//     } catch (error) {
//       console.error(error);
//     }
//   };

</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    
    
<div class="sign-in">
  <div class="sign-in-content">
    <h2>Login</h2>
  </div>
</div>
<a href="/oauth/google/authorize">Sign in with Google</a>
<a href="/oauth/github/api">Sign in with Github NPM version</a>
<!-- <a href="/oauth/github/authorize">Sign in with Github </a> -->

<!-- <button onclick="const form = document.createElement('form'); form.method = 'post'; form.action = '/oauth/api'; document.body.appendChild(form); form.submit();">Go to Github</button> -->

<!-- <button on:click={() => getGitHubIdentity('Iv1.6735dfbc776f34b5')}>Github Button</button> -->
<!-- <button on:click={handleClick}>Github Button</button> -->

<style>
</style>
