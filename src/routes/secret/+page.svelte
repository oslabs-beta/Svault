<!-- used for development testing -->

<!-- <script lang="ts">
    import type { LayoutServerData } from './$types';
    
    export let data: LayoutServerData;
</script>

<h1>{data.username}</h1> -->
<script lang="ts">
    import { page } from "$app/stores"
  </script>
  
  {#if $page.data.username}
  <h1>Secret Protected page</h1>
  <p>
    This is a protected content. You can access this content because you are
    signed in.
  </p>
  <h1>{$page.data.username}</h1>
  <!-- <p>Session expiry: {$page.data.session?.expires}</p> -->
  {:else}
  <h1>Access Denied  You must be signed in to view this page</h1>
  <!-- <p>
    <a href="/auth/signin">
      You must be signed in to view this page
    </a>
  </p> -->
  {/if}