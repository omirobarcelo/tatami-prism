<script lang="ts">
  import { CELL_SIZE } from '$lib/data/consts';
</script>

<style>
  .lock {
    fill: var(--color-text-accent);
    fill-opacity: 0.6;
    stroke: var(--color-text-accent);
    stroke-width: 1;
  }

  .lock.pad {
    fill-rule: evenodd;
  }
</style>

<svg width={CELL_SIZE} height={CELL_SIZE} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M15,40 H85 V80 C85,87 82,90 75,90 H25 C18,90 15,87 15,80 V40 Z M47,60 V72 H53 V60 A1,1,0,0,0,50,52 A1,1,0,0,0,47,60 Z"
    class="lock pad"
  />
  <path d="M25,40 V20 C25,13 28,10 35,10 H65 C72,10 75,13 75,20 V40 H65 V20 H35 V40 H25" class="lock" />
</svg>
