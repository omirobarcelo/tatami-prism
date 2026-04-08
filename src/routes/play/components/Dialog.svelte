<script lang="ts">
  import { type Snippet } from 'svelte';

  let { dialog = $bindable(undefined), children }: { dialog?: HTMLDialogElement; children: Snippet } = $props();

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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog bind:this={dialog} onclick={handleClick}>
  <div class="container">
    {@render children()}
  </div>
</dialog>
