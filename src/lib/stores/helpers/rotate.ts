import { MAX_ROTATION, ROTATION_STEP } from '$lib/data/consts';
import { Rotation } from '$lib/types/rotation.enum';
import type { Game } from '../game.store';

const getNewDirection = (direction: number, rotation: Rotation): number => {
  switch (rotation) {
    case Rotation.Clockwise:
      return (direction + ROTATION_STEP) % MAX_ROTATION;
    case Rotation.CounterClockwise:
      return ((direction - ROTATION_STEP) % MAX_ROTATION + MAX_ROTATION) % MAX_ROTATION;
    default:
      return direction;
  }
};

export const rotate = (game: Game, rotation: Rotation): Game => ({
  ...game,
  player: { ...game.player, direction: getNewDirection(game.player.direction, rotation) }
});
