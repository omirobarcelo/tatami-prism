import type { ItemId } from '$lib/data/item-id.enum';

export enum EventKind {
  None = 'none',
  PickedItem = 'picked-item',
  LockedDoor = 'locked-door',
  ReachedNextFloor = 'reached-next-floor'
}

export interface NoneEvent {
  kind: EventKind.None;
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

export type GameEvent = NoneEvent | PickedItemEvent | LockedDoorEvent | ReachedNextFloorEvent;
