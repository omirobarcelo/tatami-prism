import type { ItemId } from '$lib/data/item-id.enum';
import type { ItemType } from './item-type.enum';

export interface KeyItem {
  id: ItemId;
  kind: ItemType.Key;
  name: string;
}

export type Item = KeyItem;
