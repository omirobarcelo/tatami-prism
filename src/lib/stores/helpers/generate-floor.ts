import { Test, Test2, Test3 } from '$lib/data/maps';
import type { Map } from '$lib/types/map';
import type { Position } from '$lib/types/position';
import type { Game, NextFloor } from '../game.store';

const generateMap = async (level: number): Promise<[map: Map, player: Position]> => {
  // DEBUG
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(1500);
  // DEBUG
  const maps: Record<number, Map> = {
    1: Test,
    2: Test2,
    3: Test3
  };
  return [maps[(level % 3) + 1], { i: 1, j: 1 }];
};

export const generateFloor = async (game: Game): Promise<NextFloor> => {
  const [map, playerPos] = await generateMap(game.level + 1);
  return {
    map: map,
    initialPlayerPosition: playerPos
  };
};
