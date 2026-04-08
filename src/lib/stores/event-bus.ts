import type { GameEvent } from '$lib/types/event';

type EventHandler = (event: GameEvent) => void;

const listeners = new Set<EventHandler>();

export const eventBus = {
  emit(event: GameEvent): void {
    for (const handler of listeners) {
      handler(event);
    }
  },
  subscribe(handler: EventHandler): () => void {
    listeners.add(handler);
    return () => listeners.delete(handler);
  }
};
