<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let bgElem: HTMLElement | undefined = $state();
  let blinks: { x: number; y: number; delay: number }[] = $state([]);

  onMount(() => {
    if (!bgElem) return;
    const maxX = bgElem.clientWidth;
    const maxY = bgElem.clientHeight;

    blinks = Array.from({ length: 80 }, () => ({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
      delay: Math.floor(Math.random() * 3000)
    }));
  });
</script>

<svelte:head>
  <title>NEO Justine</title>
  <meta name="description" content="NEO Justine Landpage" />
</svelte:head>

<div class="background" bind:this={bgElem}>
  {#each blinks as { x, y, delay }}
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="blink"
      style="top: {y - 5}px; left: {x - 5}px; animation-delay: {delay}ms;"
    >
      <polygon points="0,50 35,35 50,0 65,35 100,50 65,65 50,100 35,65" fill="white" stroke="white" />
    </svg>
  {/each}
</div>

<section class="page-container">
  <div class="title-container">
    <p class="title top">
      <!-- A character(e.g.: &#160) is needed for proper alignment -->
      <!-- prettier-ignore -->
      &#160 
   __   __   ______   ______    
  /\ "-.\ \ /\  ___\ /\  __ \   
  \ \ \-.  \\ \  __\ \ \ \/\ \  
   \ \_\\"\_\\ \_____\\ \_____\ 
    \/_/_\/_/_\/_____/_\/_____/___________________________________ 
      <!-- prettier-ignore -->
    </p>
    <p class="title bottom">
      <!-- A character(e.g.: &#160) is needed for proper alignment -->
      <!-- prettier-ignore -->
      &#160
     #####\                       ##\     ##\                     
     \__## |                      ## |    \__|                    
        ## |##\   ##\  #######\ ######\   ##\ #######\   ######\  
        ## |## |  ## |##  _____|\_##  _|  ## |##  __##\ ##  __##\ 
  ##\   ## |## |  ## |\######\    ## |    ## |## |  ## |######## |
  ## |  ## |## |  ## | \____##\   ## |##\ ## |## |  ## |##   ____|
  \######  |\######  |#######  |  \####  |## |## |  ## |\#######\ 
   \______/  \______/ \_______/    \____/ \__|\__|  \__| \_______|															 
   <!-- prettier-ignore -->
    </p>
  </div>

  <div class="btn-group">
    <a href="{base}/options" class="btn">Options</a>
    <a href="{base}/play" class="btn">Play</a>
  </div>
</section>

<style>
  .page-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin: 0;
    font-family: monospace;
    white-space: break-spaces;
  }

  .title.top {
    color: var(--color-text-accent);
  }

  .title.bottom {
    color: var(--color-text-primary);
  }

  .btn-group {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .btn-group > .btn {
    width: 80px;
  }

  .background {
    position: absolute;
    width: 90vw;
    height: 90vh;
    top: 5vh;
    left: 5vw;
    z-index: -1;
  }

  .blink {
    animation: blinker 3s linear infinite;
    position: absolute;
    width: 10px;
    height: 10px;
    opacity: 0.7;
  }

  @keyframes blinker {
    from {
      opacity: 0.7;
    }
    50% {
      opacity: 0;
    }
    to {
      opacity: 0.7;
    }
  }
</style>
