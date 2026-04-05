import type { Item } from '$lib/types/item';
import { ItemType } from '$lib/types/item-type.enum';
import { ItemId } from './item-id.enum';

type Items = Record<ItemId, Item>;

export const items: Items = {
  [ItemId.DoorKey]: {
    id: ItemId.DoorKey,
    kind: ItemType.Key,
    name: 'Door Key'
  }
};
