<script lang="ts">
  import { CELL_SIZE } from '$lib/data/consts';
</script>

<style>
  .stairs {
    fill: none;
    stroke: var(--color-text-accent);
    stroke-width: 10;
  }
</style>

<svg width={CELL_SIZE} height={CELL_SIZE} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,95 H20 V80 H40 V60 H60 V40 H80 V20 H100" class="stairs" />
  <path d="M10,50 L40,20" class="stairs" />
  <path d="M20,20 H40 V40" class="stairs" />
</svg>
