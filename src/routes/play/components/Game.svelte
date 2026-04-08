<script lang="ts">
  import { CELL_SIZE } from '$lib/data/consts';
  import { cellIsShown, game } from '$lib/stores/game.store.svelte';
  import { Direction } from '$lib/types/direction.enum';
  import type { Position } from '$lib/types/position';
  import { Rotation } from '$lib/types/rotation.enum';
  import { CellState } from '$lib/types/cell-state.enum';
  import Player from './Player.svelte';
  import Stairs from './Stairs.svelte';
  import Chest from './Chest.svelte';
  import Lock from './Lock.svelte';

  const INITIAL_ZOOM = 1;
  const ZOOM_STEP = 0.05;
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 3;

  let zoom = $state(INITIAL_ZOOM);
  let matrix = $state([INITIAL_ZOOM, 0, 0, INITIAL_ZOOM, 0, 0]);

  let svgContainer: SVGGraphicsElement | undefined = $state();
  let board: SVGGElement | undefined = $state();
  let playerElem: SVGGElement | undefined = $state();

  $effect(() => {
    // Track player position to re-center camera
    game.player.position;

    if (svgContainer && board && playerElem) {
      const svgRect = svgContainer.getBoundingClientRect();
      const boardRect = board.getBoundingClientRect();
      const playerRect = playerElem.getBoundingClientRect();
      matrix[4] = svgRect.width / 2 - (playerRect.x + playerRect.width / 2 - boardRect.x);
      matrix[5] = svgRect.height / 2 - (playerRect.y + playerRect.height / 2 - boardRect.y);
    }
  });

  function handleWheel(event: WheelEvent) {
    zoom = zoom - ZOOM_STEP * Math.sign(event.deltaY);
    zoom = zoom < MIN_ZOOM ? MIN_ZOOM : zoom > MAX_ZOOM ? MAX_ZOOM : zoom;
    matrix[0] = zoom;
    matrix[3] = zoom;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.code === 'KeyW') {
      game.move(Direction.Up);
    } else if (event.code === 'KeyS') {
      game.move(Direction.Down);
    } else if (event.code === 'KeyD') {
      game.move(Direction.Right);
    } else if (event.code === 'KeyA') {
      game.move(Direction.Left);
    } else if (event.code === 'KeyQ') {
      game.rotate(Rotation.CounterClockwise);
    } else if (event.code === 'KeyE') {
      game.rotate(Rotation.Clockwise);
    }
  }

  function translate({ i, j }: Position): string {
    return `translate(${i * CELL_SIZE},${j * CELL_SIZE})`;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<svg xmlns="http://www.w3.org/2000/svg" bind:this={svgContainer} onwheel={handleWheel} class="board">
  <g bind:this={board} transform={`matrix(${matrix.join(',')})`}>
    {#each game.map.cells as row, x (x)}
      <g>
        {#each row as cell, y (y)}
          <rect
            x={x * CELL_SIZE}
            y={y * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            class="cell"
            class:empty={cell === CellState.Empty}
            class:hidden={cell === CellState.Hidden}
          />
        {/each}
      </g>
    {/each}

    {#if cellIsShown(game.map.stairs)}
      <g transform={translate(game.map.stairs)}>
        <Stairs />
      </g>
    {/if}

    {#each game.map.chests as chest, idx (idx)}
      {#if cellIsShown(chest.position)}
        <g transform={translate(chest.position)}>
          <Chest />
        </g>
      {/if}
    {/each}

    {#each game.map.locks as lock, idx (idx)}
      {#if cellIsShown(lock.position)}
        <g transform={translate(lock.position)}>
          <Lock />
        </g>
      {/if}
    {/each}

    <g bind:this={playerElem} transform={translate(game.player.position)}>
      <Player />
    </g>
  </g>
</svg>

<style>
  .board {
    width: 100%;
    height: 100%;
  }

  .cell {
    stroke: var(--color-text-accent);
    fill: var(--color-text-accent);
    fill-opacity: 0.1;
  }

  .cell.empty {
    stroke: none;
    fill: none;
  }

  .cell.hidden {
    stroke: none;
    fill: var(--color-bg);
  }
</style>
