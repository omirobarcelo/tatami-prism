<script lang="ts">
  import { CELL_SIZE } from '$lib/data/consts';
  import { game } from '$lib/stores/game.store.svelte';
</script>

<svg width={CELL_SIZE} height={CELL_SIZE} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon
    id="player"
    class="player"
    points="50,10 90,90 50,70 10,90"
    transform={`rotate(${game.player.direction})`}
    transform-origin="50 50"
  />
</svg>

<style>
  .player {
    fill: var(--color-text-accent);
  }
</style>
