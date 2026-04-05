import { intersection } from './intersection';

export const fulfillAll = <T>(state: T[], conditions: T[]): boolean =>
  intersection([state, conditions]).length === conditions.length;

export const fulfillAny = <T>(state: T[], conditions: T[]): boolean => intersection([state, conditions]).length >= 1;
