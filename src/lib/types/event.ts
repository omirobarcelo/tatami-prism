import type { ItemId } from '$lib/data/item-id.enum';

export enum EventKind {
  PickedItem = 'picked-item',
  LockedDoor = 'locked-door',
  ReachedNextFloor = 'reached-next-floor'
}

export interface PickedItemEvent {
  kind: EventKind.PickedItem;
  data: {
    itemId: ItemId;
  };
}

export interface LockedDoorEvent {
  kind: EventKind.LockedDoor;
  data: {
    keyId: ItemId;
    unlocked: boolean;
  };
}

export interface ReachedNextFloorEvent {
  kind: EventKind.ReachedNextFloor;
}

export type GameEvent = PickedItemEvent | LockedDoorEvent | ReachedNextFloorEvent;
