import type { ItemId } from '$lib/data/item-id.enum';
import { items } from '$lib/data/items';
import { get, writable } from 'svelte/store';

const MAX_ENTRIES = 200;

interface Log {
  entries: string[];
}

const NEW_LOG: Log = {
  entries: []
};

function addNewEntry(entries: string[], entry: string): string[] {
  return [...entries, entry].slice(-MAX_ENTRIES);
}

function createLog() {
  const { subscribe, set, update } = writable(NEW_LOG);

  return {
    subscribe,
    addDamageEntry: (dmg: number) =>
      update(log => ({
        ...log,
        entries: addNewEntry(log.entries, `You did <strong class="color-accent">${dmg}</strong> damage.`)
      })),
    itemObtained: (itemId: ItemId) =>
      update(log => ({
        ...log,
        entries: addNewEntry(log.entries, `You got <strong class="color-accent">${items[itemId].name}</strong>.`)
      })),
    doorLocked: () =>
      update(log => ({ ...log, entries: addNewEntry(log.entries, `You need the right key to unlock this door.`) })),
    doorUnlocked: () => update(log => ({ ...log, entries: addNewEntry(log.entries, `You unlocked the door.`) })),
    reset: () => set(NEW_LOG)
  };
}

export const log = createLog();
export const logState = () => get(log);
