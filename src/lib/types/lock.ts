import type { ItemId } from '$lib/data/item-id.enum';
import type { Position } from './position';

export interface Lock {
  position: Position;
  keyId: ItemId;
}
