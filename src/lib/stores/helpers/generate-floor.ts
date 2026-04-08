import { Test, Test2, Test3 } from '$lib/data/maps';
import type { GameMap } from '$lib/types/map';
import type { Position } from '$lib/types/position';
import type { GameState, NextFloor } from '../game.store.svelte';

const generateMap = (level: number): [map: GameMap, player: Position] => {
  const maps: Record<number, GameMap> = {
    1: Test,
    2: Test2,
    3: Test3
  };
  return [maps[(level % 3) + 1], { i: 1, j: 1 }];
};

export const generateFloor = (game: GameState): NextFloor => {
  const [map, playerPos] = generateMap(game.level + 1);
  return {
    map: map,
    initialPlayerPosition: playerPos
  };
};
