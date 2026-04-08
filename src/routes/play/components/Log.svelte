<script lang="ts">
  import { log } from '$lib/stores/log.store.svelte';

  let logElem: HTMLElement | undefined = $state();
  let autoscroll = $state(false);

  $effect.pre(() => {
    log.entries;
    autoscroll = !!logElem && logElem.offsetHeight + logElem.scrollTop > logElem.scrollHeight - 20;
  });

  $effect(() => {
    log.entries;
    if (autoscroll && logElem) {
      logElem.scrollTo(0, logElem.scrollHeight);
    }
  });
</script>

<div bind:this={logElem} class="log">
  {#each log.entries as entry}
    <p class="entry">{@html entry}</p>
  {/each}
</div>

<style>
  .log {
    height: 100%;
    overflow-y: auto;
    white-space: break-spaces;
  }

  .log > .entry {
    margin: 0;
    margin-top: 6px;
  }

  .log > .entry:first-child {
    margin-top: 0;
  }
</style>
