import type { ItemId } from '$lib/data/item-id.enum';
import type { KeyItem } from '$lib/types/item';

class PlayerStore {
  keyItems: KeyItem[] = $state([]);

  addKeyItem(item: KeyItem): void {
    this.keyItems.push(item);
  }

  removeKeyItem(itemId: ItemId): void {
    this.keyItems = this.keyItems.filter(item => item.id !== itemId);
  }

  reset(): void {
    this.keyItems = [];
  }
}

export const player = new PlayerStore();
