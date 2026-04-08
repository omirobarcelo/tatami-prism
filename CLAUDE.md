# NEO Justine

Browser-only dungeon crawl game built with SvelteKit 2, Svelte 5, TypeScript, and Vite 6.
Deployed as a static site via `@sveltejs/adapter-static`.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (static site to build/)
npm run preview      # Preview production build
npm run check        # Type-check with svelte-check
npm run lint         # Prettier + ESLint check
npm run format       # Auto-format with Prettier
```

## Architecture

- `src/routes/` — SvelteKit pages: home (`/`), options (`/options`), play (`/play`)
- `src/routes/play/components/` — Game components (Game, Player, Chest, Lock, Stairs, Dialog, KeyItems, Log)
- `src/lib/stores/` — Svelte writable stores for game state, player inventory, event log, event emitter
- `src/lib/stores/helpers/` — Pure game logic: movement, rotation, floor generation
- `src/lib/types/` — TypeScript types and enums
- `src/lib/data/` — Game data: maps, items, constants

## Key Patterns

- All rendering is SVG — the game board, player, items are SVG elements inside a transformed `<g>` group
- State uses Svelte 3-era `writable` stores (not yet migrated to `$state` runes) — components use `$store` syntax
- Game logic (move.ts, rotate.ts) is pure TypeScript, decoupled from Svelte
- Event system: `eventEmitter` writable store acts as an event bus between game logic and UI side-effects
- Keyboard input handled via `<svelte:window onkeydown>` checking `event.code` (KeyW/KeyA/KeyS/KeyD/KeyQ/KeyE)
- Map coordinates: `i` = row (left/right), `j` = column (up/down). Position `{i, j}` maps to `translate(i*100, j*100)` in SVG

## Gotchas

- `CELL_SIZE` is 100 — all SVG positioning multiplies grid coords by 100
- The `Map` type in `src/lib/types/map.ts` shadows the built-in JS `Map`
- `generate-floor.ts` has a 1500ms artificial delay (DEBUG leftover)
- The options page disables CSR in production (`export const csr = dev`) — intentional for that static page
- `base` path is `/neo-justine` in production builds (for GitHub Pages deployment)

## Testing

No test framework is configured. Use `/smoke-test` skill for browser-based verification via Puppeteer MCP.
Baseline checklist: `tests/baseline-checklist.md`
