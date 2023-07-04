<script lang="ts">
    import type { LayoutServerData } from './$types';
  
    // export let data: LayoutServerData;

    export let data: LayoutServerData;
</script>
  

<!--   
  <header>
    <nav class="navbar is-primary px-4" aria-label="main navigation">
      <div class="navbar-brand pr-4">
        <span class="is-size-3 has-text-weight-semibold">Router- page.svelte nav bar</span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a href="/" class="navbar-item">Home</a>
        </div>
      </div>
    </nav>
  </header> -->

  <body>
    <div class='logged in hello'>
      {#if data?.username}
              <span>Hello {data.username}</span>
      {/if}
    </div>
  </body>
  <slot />