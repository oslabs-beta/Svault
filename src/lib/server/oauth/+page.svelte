<script lang ='ts'>
  import { github } from './github/authorize/github.js'
  import { goto } from '$app/navigation';
  import { getContext } from 'svelte';
  const context = getContext('$app');
 
  const handleClick = async () => {
    try {
      const response = await github({ context });
      console.log(response)
      goto(response.headers.Location);
    } catch (error) {
      console.error(error);
    }
  };

</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    
    
<div class="sign-in">
  <div class="sign-in-content">
    <h2>Login</h2>
  </div>
</div>
<!-- <a href="/oauth/google/authorize">Sign in with Google</a> -->
<a href="/oauth/github/authorize">Sign in with Github</a>
<!-- <button on:click={handleClick}>sign in with github boi</button> -->

<style>
</style>
