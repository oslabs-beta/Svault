<!-- used for development testing -->

<script lang="ts">
  import type { LayoutServerData } from "./$types";
  // import { setBrowserSession } from '$lib/server/sessionStore/index.ts';
  //import { onMount } from 'svelte';

  // TODO: bring in backend sessions to browser
  // onMount(() => {
  //   setBrowserSession(username, sid)
  // })

  import GithubButton from "$lib/components/GithubButton.svelte";
  import GoogleButton from "$lib/components/GoogleButton.svelte";
  import DiscordButton from "$lib/components/DiscordButton.svelte";
  export let data: LayoutServerData;
</script>

<header>
  <nav>
    <div>
      <span>Welcome to Svault Login Page</span>
    </div>
    
    <div>
      <div>
        <a href="/">Home</a>
      </div>
    </div>
    <div>
      {#if data.username}
        <a
          href="/logout"
          data-sveltekit-preload-data="off"
          data-sveltekit-reload>Hello {data.username}, Log out</a
        >
      {:else}
        <a href="/login">Log in</a>
        <a href="/oauth">OAuth</a>
      {/if}
    </div>
  </nav>
</header>
<div class="btn">
  <GithubButton />
  <GoogleButton />
  <DiscordButton />
</div>
<slot />

<style>
  .btn {
    display: flex;
    flex-direction: column;
  }
</style>
