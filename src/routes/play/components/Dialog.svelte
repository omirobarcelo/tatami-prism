<script lang="ts">
  export let dialog: HTMLDialogElement;

  function handleClick(evt: MouseEvent) {
    if (evt.target === dialog) {
      dialog.close();
    }
  }
</script>

<style>
  dialog {
    border: 1px solid var(--color-text-accent);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0;
  }

  dialog > .container {
    padding: 14px;
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close on:click={handleClick}>
  <div class="container">
    <slot />
  </div>
</dialog>
