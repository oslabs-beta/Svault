<!-- used for development testing -->

<script lang="ts">
    import type { LayoutServerData } from './$types';
    // // import { setBrowserSession } from '$lib/server/sessionStore/index.ts';
    //import { onMount } from 'svelte';

    // // TODO: bring in backend sessions to browser
      // onMount(() => {
      //   setBrowserSession(username, sid)
      // })
 

    export let data: LayoutServerData;
</script>
      
  <header>
    <nav class="navbar is-primary px-4" aria-label="main navigation">
      <div class="navbar-brand pr-4">
        <span class="is-size-3 has-text-weight-semibold">Welcome to Svault Login Page</span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a href="/" class="navbar-item">Home</a>
        </div>
      </div>
      <div>
        {#if data?.username}
          <a
            href="/logout"
            class="button is-primary"
            data-sveltekit-preload-data="off"
            data-sveltekit-reload>Hello {data.username}, Log out</a
          >
        {:else}
          <a href="/login" class="button is-primary">Log in</a>
          <a href='/oauth'>OAuth</a>
        {/if}
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            {#if data?.username}
              <span>Hello {data.username}</span>
            {:else}
              <a href="/login" class="button is-primary">Layout Log in</a>
            {/if}
          </div>
        </div>
      </div>
    </nav>
  </header>
  <slot />