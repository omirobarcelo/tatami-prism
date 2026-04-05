import { onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import { EventKind, type GameEvent } from '$lib/types/event';
import { log } from './log.store';
import { gameState, generateNextFloor } from './game.store';
import { player } from './player.store';
import { items } from '$lib/data/items';

export const eventEmitter = writable<GameEvent>({ kind: EventKind.None });

export const eventListener = () => {
  const unsubscribe = eventEmitter.subscribe(event => {
    // DEBUG
    console.log('Event triggered', event);
    // DEBUG

    switch (event.kind) {
      case EventKind.PickedItem: {
        // Add item to inventory
        player.addKeyItem(items[event.data.itemId]);

        // Log picked up item
        log.itemObtained(event.data.itemId);
        break;
      }
      case EventKind.LockedDoor: {
        if (event.data.unlocked) {
          // Remove key from inventory
          player.removeKeyItem(event.data.keyId);

          // Log unlocked door
          log.doorUnlocked();
        } else {
          log.doorLocked();
        }
        break;
      }
      case EventKind.ReachedNextFloor: {
        generateNextFloor(gameState());
        break;
      }
    }
  });

  onDestroy(unsubscribe);
};
