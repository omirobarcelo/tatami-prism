# Svelte 5 Idiomatic Refactors

Remaining refactors identified during the Svelte 3 → 5 migration code review.
The upgrade is complete and all features work, but several patterns are still Svelte 3-era.

## 1. Migrate stores to `$state` runes

**Priority:** High
**Effort:** Medium
**Files:** `game.store.ts`, `player.store.ts`, `log.store.ts`, `event-emitter.store.ts`

Currently all stores use `writable()` from `svelte/store`. The Svelte 5 idiomatic approach is reactive classes in `.svelte.ts` files.

### Steps

- [ ] Rename `game.store.ts` → `game.store.svelte.ts`
  - Replace `writable` + `createGame()` factory with a class using `$state` fields
  - Export a singleton instance
  - Remove `get(game)` / `gameState()` — direct property access replaces it
  - Keep `move()`, `rotate()`, `setNextFloor()`, `reset()` as class methods
- [ ] Rename `player.store.ts` → `player.store.svelte.ts`
  - Same pattern: class with `$state` fields for `keyItems`
  - Remove `get(player)` / `playerState()`
- [ ] Rename `log.store.ts` → `log.store.svelte.ts`
  - Same pattern: class with `$state` fields for `entries`
  - Remove `get(log)` / `logState()`
- [ ] Refactor `event-emitter.store.ts` → callback-based event bus
  - Replace `writable` with a simple publish/subscribe pattern or direct function calls
  - This eliminates the "replays last event on subscribe" bug
  - Consider replacing with direct function calls from `move.ts` helpers since the event types are small and well-defined
- [ ] Update all component `$store` references to direct property access
  - `$game.map.cells` → `game.map.cells`
  - `$player.keyItems` → `player.keyItems`
  - `$log.entries` → `log.entries`
- [ ] Update `move.ts` and `rotate.ts` to work with the new store classes
  - `playerState()` calls → direct `player.keyItems` access
  - `gameState()` calls → direct `game` property access
- [ ] Run `/smoke-test` to verify everything still works

### Notes

- The `.svelte.ts` extension is required for `$state` runes to work outside components
- All game logic helpers (move.ts, rotate.ts) are pure functions that take and return `Game` objects — these don't need to change, only the store wrapper around them
- The `eventEmitter` is the trickiest part — it's used in `move.ts` to trigger side effects during game logic. Consider whether the event bus pattern is still needed or if direct method calls would be simpler

## 2. Redesign event system

**Priority:** High
**Effort:** Medium
**Files:** `event-emitter.store.ts`, `move.ts`, `+page.svelte` (play)

The current event emitter has two design issues:

1. It replays the last event on subscribe (Svelte store contract)
2. The `None` initial value is a code smell

### Decision: Option B — Custom event bus

Chosen over direct callbacks because multiple event sources are planned (player actions + enemy actions).
A proper event bus keeps game logic (move, enemy AI) decoupled from UI side effects (inventory, log, animations).

### Design

- Simple pub/sub: `Set<(event: GameEvent) => void>` — no stored value, no replay on subscribe
- `emit(event)` fires all listeners synchronously
- `subscribe(fn)` returns an unsubscribe function
- Typed `GameEvent` discriminated union (already exists) — extend with new event kinds as needed
- Single global instance, no Svelte store dependency

### Steps

- [ ] Implement custom event bus (plain `.ts` file, no Svelte dependency)
- [ ] Remove `eventEmitter` writable store
- [ ] Remove `eventListener()` from play page and its `onDestroy` cleanup
- [ ] Run `/smoke-test`

## 3. Fix `intersection.ts` parameter mutation

**Priority:** Low
**Effort:** Trivial
**Files:** `src/lib/utils/intersection.ts`

The `intersection()` function mutates its `arrays` parameter in-place when sorting by length.

### Steps

- [ ] Clone the outer array: `const sorted = [...arrays]` and operate on the clone
- [ ] Or change the type to `readonly ReadonlyArray<T>[]` to make TypeScript catch it

## 4. Remove `generate-floor.ts` debug delay

**Priority:** Low
**Effort:** Trivial
**Files:** `src/lib/stores/helpers/generate-floor.ts`

There's a 1500ms `setTimeout` delay that's a debug leftover.

### Steps

- [ ] Remove the artificial delay
- [ ] Make the function synchronous if the delay was the only async part

## 5. Rename `Map` type to avoid shadowing built-in

**Priority:** Low
**Effort:** Low
**Files:** `src/lib/types/map.ts` and all importers

The `Map` interface shadows the global `Map` constructor.

### Steps

- [ ] Rename to `GameMap` or `FloorMap`
- [ ] Update all imports across the codebase
- [ ] Run `npm run check` to verify no breakage

## Execution Order

1. **Item 4** (remove debug delay) — trivial, independent
2. **Item 3** (fix mutation) — trivial, independent
3. **Item 5** (rename Map type) — low effort, independent
4. **Items 1 + 2** together (store migration + event system redesign) — these are coupled and should be done as one unit
5. Run `/smoke-test` after each item
