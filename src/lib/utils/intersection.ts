// Taken from https://github.com/lovasoa/fast_array_intersect

const defaultHash = <T>(x: T): unknown => x;

/**
 * Takes an array of arrays and optionnally a hash function,
 * and returns the elements that are present in all the arrays.
 * When intersecting arrays of objects, you should use a custom
 * hash function that returns identical values when given objects
 * that should be considered equal in your application.
 * The default hash function is the identity function.
 * When performance is not critical, a handy hash function can be `JSON.stringify`.
 */
export const intersection = <T>(arrays: ReadonlyArray<T>[], hash = defaultHash): T[] => {
  if (arrays.length === 0) {
    return [];
  }

  // Clone to avoid mutating the caller's array
  const sorted = [...arrays];

  // Put the smallest array in the beginning
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].length < sorted[0].length) {
      const tmp = sorted[0];
      sorted[0] = sorted[i];
      sorted[i] = tmp;
    }
  }

  // Create a map associating each element to its current count
  const set = new Map();
  for (const elem of sorted[0]) {
    set.set(hash(elem), 1);
  }
  for (let i = 1; i < sorted.length; i++) {
    let found = 0;
    for (const elem of sorted[i]) {
      const hashed = hash(elem);
      const count = set.get(hashed);
      if (count === i) {
        set.set(hashed, count + 1);
        found++;
      }
    }
    // Stop early if an array has no element in common with the smallest
    if (found === 0) return [];
  }

  // Output only the elements that have been seen as many times as there are arrays
  return sorted[0].filter(e => {
    const hashed = hash(e);
    const count = set.get(hashed);
    if (count !== undefined) set.set(hashed, 0);
    return count === sorted.length;
  });
};
