<script lang="ts">
  import { player } from '$lib/stores/player.store';
  import Dialog from './Dialog.svelte';

  export let dialog: HTMLDialogElement;
</script>

<style>
  .item {
    color: var(--color-text-primary);
  }
</style>

<Dialog bind:dialog>
  {#each $player.keyItems as keyItem (keyItem.id)}
    <p class="item">{keyItem.name}</p>
  {/each}
</Dialog>
