import { CellState } from '$lib/types/cell-state.enum';
import type { GameMap } from '$lib/types/map';
import { ItemId } from './item-id.enum';

const E = CellState.Empty;
const H = CellState.Hidden;

// TEST
const TestMap = [
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, H, H, H, H, H, E, E, E, E, E, H, H, H, H, H, E],
  [E, H, H, H, H, H, E, E, E, E, E, H, H, H, H, H, E],
  [E, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, E],
  [E, H, H, H, H, H, E, E, E, E, E, H, H, H, H, H, E],
  [E, H, H, H, H, H, E, E, E, E, E, H, H, H, H, H, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E]
];

const TestStairs = { i: 3, j: 15 };

const TestChests = [
  {
    position: { i: 3, j: 3 },
    itemId: ItemId.DoorKey
  }
];

const TestLocks = [
  {
    position: { i: 3, j: 8 },
    keyId: ItemId.DoorKey
  }
];

export const Test: GameMap = {
  cells: TestMap,
  stairs: TestStairs,
  chests: TestChests,
  locks: TestLocks
};

// TEST2
const Test2Map = [
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H]
];

const Test2Stairs = { i: 5, j: 6 };

export const Test2: GameMap = {
  cells: Test2Map,
  stairs: Test2Stairs,
  chests: [],
  locks: []
};

// TEST3
const Test3Map = [
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, E, E, H, H, H],
  [H, H, H, E, E, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H]
];

const Test3Stairs = { i: 7, j: 7 };

export const Test3: GameMap = {
  cells: Test3Map,
  stairs: Test3Stairs,
  chests: [],
  locks: []
};
