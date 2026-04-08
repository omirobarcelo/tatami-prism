import { EventKind, type GameEvent } from '$lib/types/event';
import { items } from '$lib/data/items';
import { eventBus } from './event-bus';
import { game } from './game.store.svelte';
import { log } from './log.store.svelte';
import { player } from './player.store.svelte';

function handleEvent(event: GameEvent): void {
  switch (event.kind) {
    case EventKind.PickedItem: {
      player.addKeyItem(items[event.data.itemId]);
      log.itemObtained(event.data.itemId);
      break;
    }
    case EventKind.LockedDoor: {
      if (event.data.unlocked) {
        player.removeKeyItem(event.data.keyId);
        log.doorUnlocked();
      } else {
        log.doorLocked();
      }
      break;
    }
    case EventKind.ReachedNextFloor: {
      game.generateNextFloor();
      break;
    }
  }
}

export function startEventListener(): () => void {
  return eventBus.subscribe(handleEvent);
}
