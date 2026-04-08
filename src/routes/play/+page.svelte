<script lang="ts">
  import { onDestroy } from 'svelte';
  import { startEventListener } from '$lib/stores/event-listener';
  import { log } from '$lib/stores/log.store.svelte';
  import Game from './components/Game.svelte';
  import KeyItems from './components/KeyItems.svelte';
  import Log from './components/Log.svelte';

  const unsubscribe = startEventListener();
  onDestroy(unsubscribe);

  let keyItemsDialog: HTMLDialogElement;
</script>

<svelte:head>
  <title>NEO Justine</title>
  <meta name="description" content="NEO Justine: playing..." />
</svelte:head>

<!-- TODO -->
<!-- <svelte:window on:beforeunload={save} /> -->

<section class="page">
  <div class="left box">
    <p>Some text</p>
  </div>
  <div class="center">
    <div class="map box">
      <Game />
    </div>
    <div class="log box">
      <Log />
    </div>
  </div>
  <div class="right box">
    <button class="btn" onclick={() => log.addDamageEntry(Math.floor(Math.random() * 100))}>Click</button>
    <button class="btn" onclick={() => keyItemsDialog.showModal()}>Key Items</button>
  </div>
</section>

<KeyItems bind:dialog={keyItemsDialog} />

<style>
  .page {
    display: flex;
    flex-direction: row;
  }

  .left,
  .right {
    flex: 0 0 auto;
    width: 256px;
  }

  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .map {
    flex: 1;
  }

  .log {
    flex: 0 0 auto;
    height: 128px;
  }
</style>
