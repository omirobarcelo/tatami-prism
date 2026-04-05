import { get, writable } from 'svelte/store';
import { Test, Test2 } from '$lib/data/maps';
import { CellState } from '$lib/types/cell-state.enum';
import type { Direction } from '$lib/types/direction.enum';
import type { Map } from '$lib/types/map';
import type { Position } from '$lib/types/position';
import type { Rotation } from '$lib/types/rotation.enum';
import { move, uncover } from './helpers/move';
import { rotate } from './helpers/rotate';
import { generateFloor } from './helpers/generate-floor';

export interface NextFloor {
  map: Map;
  initialPlayerPosition: Position;
}

export interface Game {
  level: number;
  map: Map;
  next: NextFloor;
  player: {
    position: Position;
    direction: number;
  };
}

const NEW_GAME: Game = {
  level: 1,
  map: Test,
  next: {
    map: Test2,
    initialPlayerPosition: { i: 1, j: 1 }
  },
  player: { position: { i: 4, j: 4 }, direction: 0 }
};

function createGame() {
  const { subscribe, set, update } = writable({
    ...NEW_GAME,
    map: { ...NEW_GAME.map, cells: uncover(NEW_GAME.map.cells, NEW_GAME.player.position) }
  });

  return {
    subscribe,
    move: (direction: Direction) => update(game => move(game, direction)),
    rotate: (rotation: Rotation) => update(game => rotate(game, rotation)),
    setNextFloor: (nextFloor: NextFloor) => update(game => ({ ...game, next: nextFloor })),
    reset: () => set(NEW_GAME)
  };
}

export const game = createGame();
export const gameState = () => get(game);
export const cellIsShown = (game: Game, { i, j }: Position): boolean => game.map.cells[i][j] === CellState.Shown;
export const generateNextFloor = async (g: Game): Promise<void> =>
  generateFloor(g).then(nextFloor => game.setNextFloor(nextFloor));
