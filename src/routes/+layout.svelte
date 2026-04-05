<script>
  import './styles.css';
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
    <slot />
  </main>
</div>
