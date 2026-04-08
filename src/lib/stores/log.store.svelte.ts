import type { ItemId } from '$lib/data/item-id.enum';
import { items } from '$lib/data/items';

const MAX_ENTRIES = 200;

class LogStore {
  entries: string[] = $state([]);

  private addEntry(entry: string): void {
    this.entries.push(entry);
    if (this.entries.length > MAX_ENTRIES) {
      this.entries = this.entries.slice(-MAX_ENTRIES);
    }
  }

  addDamageEntry(dmg: number): void {
    this.addEntry(`You did <strong class="color-accent">${dmg}</strong> damage.`);
  }

  itemObtained(itemId: ItemId): void {
    this.addEntry(`You got <strong class="color-accent">${items[itemId].name}</strong>.`);
  }

  doorLocked(): void {
    this.addEntry('You need the right key to unlock this door.');
  }

  doorUnlocked(): void {
    this.addEntry('You unlocked the door.');
  }

  reset(): void {
    this.entries = [];
  }
}

export const log = new LogStore();
