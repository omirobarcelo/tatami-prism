import type { CellState } from './cell-state.enum';
import type { Chest } from './chest';
import type { Lock } from './lock';
import type { Position } from './position';

export interface GameMap {
  cells: CellState[][];
  stairs: Position;
  chests: Chest[];
  locks: Lock[];
}
