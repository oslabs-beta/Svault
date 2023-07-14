<script lang="ts">
    import type { LayoutServerData } from './$types';
    
    export let data: LayoutServerData;
</script>

<h1>{data.username}</h1>