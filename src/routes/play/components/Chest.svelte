<script lang="ts">
  import { CELL_SIZE } from '$lib/data/consts';
</script>

<style>
  .chest {
    fill: var(--color-text-accent);
    fill-opacity: 0.6;
    stroke: var(--color-text-accent);
    stroke-width: 1;
  }
</style>

<svg width={CELL_SIZE} height={CELL_SIZE} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M10,45 V25 C10,18 13,15 20,15 H80 C87,15 90,18 90,25 V45 H60 V40 H40 V45 H10" class="chest" />
  <path d="M10,50 H40 V55 L46,60 H54 L60,55 V50 H90 V85 H10 V50" class="chest" />
  <path d="M45,44 H55 V54 H45 V44" class="chest" />
</svg>
