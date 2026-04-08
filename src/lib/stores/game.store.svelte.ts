import { Test, Test2 } from '$lib/data/maps';
import { CellState } from '$lib/types/cell-state.enum';
import type { Direction } from '$lib/types/direction.enum';
import type { GameMap } from '$lib/types/map';
import type { Position } from '$lib/types/position';
import type { Rotation } from '$lib/types/rotation.enum';
import { move, uncover } from './helpers/move';
import { rotate } from './helpers/rotate';
import { generateFloor } from './helpers/generate-floor';

export interface NextFloor {
  map: GameMap;
  initialPlayerPosition: Position;
}

export interface GameState {
  level: number;
  map: GameMap;
  next: NextFloor;
  player: {
    position: Position;
    direction: number;
  };
}

const NEW_GAME: GameState = {
  level: 1,
  map: Test,
  next: {
    map: Test2,
    initialPlayerPosition: { i: 1, j: 1 }
  },
  player: { position: { i: 4, j: 4 }, direction: 0 }
};

class GameStore {
  level: number = $state(NEW_GAME.level);
  map: GameMap = $state({ ...NEW_GAME.map, cells: uncover(NEW_GAME.map.cells, NEW_GAME.player.position) });
  next: NextFloor = $state(NEW_GAME.next);
  player: { position: Position; direction: number } = $state({ ...NEW_GAME.player });

  move(direction: Direction): void {
    const result = move(this.snapshot(), direction);
    this.apply(result);
  }

  rotate(rotation: Rotation): void {
    const result = rotate(this.snapshot(), rotation);
    this.apply(result);
  }

  setNextFloor(nextFloor: NextFloor): void {
    this.next = nextFloor;
  }

  generateNextFloor(): void {
    const nextFloor = generateFloor(this.snapshot());
    this.setNextFloor(nextFloor);
  }

  reset(): void {
    this.apply(NEW_GAME);
  }

  snapshot(): GameState {
    return {
      level: this.level,
      map: this.map,
      next: this.next,
      player: this.player
    };
  }

  private apply(state: GameState): void {
    this.level = state.level;
    this.map = state.map;
    this.next = state.next;
    this.player = state.player;
  }
}

export const game = new GameStore();

export const cellIsShown = ({ i, j }: Position): boolean => game.map.cells[i][j] === CellState.Shown;
