<script lang="ts">
  import { log } from '$lib/stores/log.store';

  let logElem: HTMLElement | undefined = $state();
  let autoscroll = $state(false);

  $effect.pre(() => {
    // Access entries to track as dependency
    $log.entries;
    autoscroll = !!logElem && logElem.offsetHeight + logElem.scrollTop > logElem.scrollHeight - 20;
  });

  $effect(() => {
    // Access entries to track as dependency
    $log.entries;
    if (autoscroll && logElem) {
      logElem.scrollTo(0, logElem.scrollHeight);
    }
  });
</script>

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

<div bind:this={logElem} class="log">
  {#each $log.entries as entry}
    <p class="entry">{@html entry}</p>
  {/each}
</div>
