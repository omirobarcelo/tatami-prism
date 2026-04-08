<script lang="ts">
  import { player } from '$lib/stores/player.store.svelte';
  import Dialog from './Dialog.svelte';

  let { dialog = $bindable(undefined) }: { dialog?: HTMLDialogElement } = $props();
</script>

<Dialog bind:dialog>
  {#each player.keyItems as keyItem (keyItem.id)}
    <p class="item">{keyItem.name}</p>
  {/each}
</Dialog>

<style>
  .item {
    color: var(--color-text-primary);
  }
</style>
