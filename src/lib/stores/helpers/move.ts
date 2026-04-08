import { UNCOVER_RADIUS } from '$lib/data/consts';
import { CellState } from '$lib/types/cell-state.enum';
import type { Chest } from '$lib/types/chest';
import { Direction } from '$lib/types/direction.enum';
import { EventKind } from '$lib/types/event';
import type { Lock } from '$lib/types/lock';
import type { Position } from '$lib/types/position';
import { eventBus } from '../event-bus';
import type { GameState } from '../game.store.svelte';
import { player } from '../player.store.svelte';

/**
 * @param position
 * @param direction
 * @param map
 * @returns new position according to direction as long as it is not empty
 */
const getNewPosition = (position: Position, direction: Direction, map: CellState[][]): Position => {
  const cellIsValid = ({ i, j }: Position): boolean =>
    i >= 0 && j >= 0 && i < map.length && j < map[i].length && map[i][j] !== CellState.Empty;

  switch (direction) {
    case Direction.Up: {
      const j = position.j - 1;
      return cellIsValid({ i: position.i, j }) ? { ...position, j } : { ...position };
    }
    case Direction.Down: {
      const j = position.j + 1;
      return cellIsValid({ i: position.i, j }) ? { ...position, j } : { ...position };
    }
    case Direction.Right: {
      const i = position.i + 1;
      return cellIsValid({ i, j: position.j }) ? { ...position, i } : { ...position };
    }
    case Direction.Left: {
      const i = position.i - 1;
      return cellIsValid({ i, j: position.j }) ? { ...position, i } : { ...position };
    }
    default:
      return { ...position };
  }
};

/**
 * Triggers Locked Door event.
 * Unlocking fails if player reached a lock and does not have the key.
 * If the player has the key or did not reach a lock, then unlocking is considered successful.
 * @param locks
 * @param playerPos
 * @returns updated map locks and if unlocking failed
 */
const checkLocks = (locks: Lock[], playerPos: Position): [locks: Lock[], locked: boolean] => {
  const updatedLocks = [...locks];
  let locked = false;

  const lockFoundIdx = updatedLocks.findIndex(
    lock => lock.position.i === playerPos.i && lock.position.j === playerPos.j
  );
  if (lockFoundIdx !== -1) {
    locked = !player.keyItems.some(keyItem => keyItem.id === updatedLocks[lockFoundIdx].keyId);

    eventBus.emit({
      kind: EventKind.LockedDoor,
      data: { keyId: updatedLocks[lockFoundIdx].keyId, unlocked: !locked }
    });

    if (!locked) {
      updatedLocks.splice(lockFoundIdx, 1);
    }
  }

  return [updatedLocks, locked];
};

/**
 * Triggers Picked Item event.
 * @param chests
 * @param playerPos
 * @returns updated map chests
 */
const checkChests = (chests: Chest[], playerPos: Position): Chest[] => {
  const updatedChests = [...chests];

  const chestFoundIdx = updatedChests.findIndex(
    chest => chest.position.i === playerPos.i && chest.position.j === playerPos.j
  );
  if (chestFoundIdx !== -1) {
    eventBus.emit({ kind: EventKind.PickedItem, data: { itemId: updatedChests[chestFoundIdx].itemId } });
    updatedChests.splice(chestFoundIdx, 1);
  }

  return updatedChests;
};

/**
 * @param stairs
 * @param playerPos
 * @returns true if stairs and player in the same position
 */
const checkStairs = (stairs: Position, playerPos: Position): boolean => {
  return stairs.i === playerPos.i && stairs.j === playerPos.j;
};

/**
 * Switches map to next floor and increases the level.
 * Triggers the Reached Next Floor event.
 * @param game
 * @returns game with map assigned the next floor
 */
const goToNextFloor = (game: GameState): GameState => {
  eventBus.emit({ kind: EventKind.ReachedNextFloor });

  return {
    ...game,
    level: game.level + 1,
    map: {
      ...game.next.map,
      cells: uncover(game.next.map.cells, game.next.initialPlayerPosition)
    },
    player: {
      ...game.player,
      position: game.next.initialPlayerPosition
    }
  };
};

/**
 * Updates current map.
 * @param game
 * @param possiblePlayerPos
 * @returns game with updated map
 */
const updateCurrentFloor = (game: GameState, possiblePlayerPos: Position): GameState => {
  const [locks, locked] = checkLocks(game.map.locks, possiblePlayerPos);
  const newPlayerPosition = locked ? game.player.position : possiblePlayerPos;
  return {
    ...game,
    map: {
      ...game.map,
      cells: uncover(game.map.cells, newPlayerPosition),
      chests: checkChests(game.map.chests, newPlayerPosition),
      locks: locks
    },
    player: { ...game.player, position: newPlayerPosition }
  };
};

/**
 * @param map
 * @param center
 * @returns updated cells according to UNCOVER_RADIUS
 */
export const uncover = (map: CellState[][], center: Position): CellState[][] => {
  const tmp = map.map(row => [...row]);

  for (let x = -UNCOVER_RADIUS; x <= UNCOVER_RADIUS; x++) {
    for (let y = -UNCOVER_RADIUS; y <= UNCOVER_RADIUS; y++) {
      if (Math.abs(x) + Math.abs(y) <= UNCOVER_RADIUS) {
        const pos = { i: center.i + x, j: center.j + y };
        const isInsideMap = pos.i >= 0 && pos.j >= 0 && pos.i < tmp.length && pos.j < tmp[pos.i].length;
        if (isInsideMap && tmp[pos.i][pos.j] !== CellState.Empty) {
          tmp[pos.i][pos.j] = CellState.Shown;
        }
      }
    }
  }

  return tmp;
};

export const move = (game: GameState, direction: Direction): GameState => {
  const newPlayerPosition = getNewPosition(game.player.position, direction, game.map.cells);
  const stairsReached = checkStairs(game.map.stairs, newPlayerPosition);
  return stairsReached ? goToNextFloor(game) : updateCurrentFloor(game, newPlayerPosition);
};
