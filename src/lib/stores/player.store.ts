import type { ItemId } from '$lib/data/item-id.enum';
import type { KeyItem } from '$lib/types/item';
import { get, writable } from 'svelte/store';

interface Player {
  keyItems: KeyItem[];
}

const NEW_PLAYER: Player = {
  keyItems: []
};

function createPlayer() {
  const { subscribe, set, update } = writable(NEW_PLAYER);

  return {
    subscribe,
    addKeyItem: (item: KeyItem) => update(player => ({ ...player, keyItems: [...player.keyItems, item] })),
    removeKeyItem: (itemId: ItemId) =>
      update(player => ({
        ...player,
        keyItems: player.keyItems.reduce((acc, item) => (item.id === itemId ? acc : [...acc, item]), [] as KeyItem[])
      })),
    reset: () => set(NEW_PLAYER)
  };
}

export const player = createPlayer();
export const playerState = () => get(player);
