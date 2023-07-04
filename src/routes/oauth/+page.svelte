<script lang ='ts'>
  // import { GET } from '$lib/server/oauth/githubTest/authorize/+server.js'
  import { goto } from '$app/navigation';

  function signInWithGithub() {
    goto('/oauth/github/authorize');
  }
  // const test = Oauth();
//   window.onload = function () {
    // google.accounts.id.initialize({
    //   client_id: '144276105113-kkncvrkkfr59iidohhngjqptkiuip8j8.apps.googleusercontent.com',
    //   callback: handleCredentialResponse
    // });
    // google.accounts.id.prompt();
//   }
    //import googleauth logic 
    
    //create an onclick function
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    
    
<div class="sign-in">
  <div class="sign-in-content">
    <h2>Login</h2>
    <form class="auth-form" method="post" action="?/OAuth2"> 
      <div>
        <button class="btn-auth"  type="submit">
          Sign In with Google
        </button>
      </div>
    </form> 
  </div>
</div>
<a href="/oauth/github/authorize">Sign in with Github</a>
<button on:click={signInWithGithub}>sign in with github boi</button>

<style>
</style>
<!-- <button on:click{}>Sign in to Google</button> -->
