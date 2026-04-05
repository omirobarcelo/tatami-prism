import type { ItemId } from '$lib/data/item-id.enum';
import type { Position } from './position';

export interface Chest {
  position: Position;
  itemId: ItemId;
}
