<script lang="ts">
  import './styles.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<style>
  .app {
    min-width: 100vw;
    min-height: 100vh;
  }

  main {
    width: 100vw;
    height: 100vh;
  }
</style>

<div class="app">
  <main>
    {@render children()}
  </main>
</div>
