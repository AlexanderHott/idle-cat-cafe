/**
 * Selects a random set of items from two arrays of common
 * and rare items, based on given probabilities. It combines
 * both arrays, shuffles them, and selects a number of items
 * based on `pickCountProbabilities` and `rareProbability`.
 */
export function pickRandomItems<T>(
  commonItems: T[],
  rareItems: T[],
  pickCountProbabilities: number[],
  rareProbability: number,
): T[] {
  // Combine both arrays and shuffle them to ensure randomness
  const allItems = [...commonItems, ...rareItems].sort(
    () => 0.5 - Math.random(),
  );

  // Determine the number of items to pick
  let pickCount = randomPickCount(pickCountProbabilities);
  pickCount = Math.min(pickCount, allItems.length); // Ensure we don't pick more items than available

  const selectedItems = new Set<T>();

  while (selectedItems.size < pickCount) {
    const isRare = Math.random() < rareProbability;
    const itemArray = isRare && rareItems.length > 0 ? rareItems : commonItems;
    // SAFETY: always in bounds
    const randomItem = itemArray[Math.floor(Math.random() * itemArray.length)]!;

    selectedItems.add(randomItem);
  }

  return Array.from(selectedItems);
}

/**
 * Determines the number of items to pick based on a random selection
 * from pickCountProbabilities.
 */
function randomPickCount(pickCountProbabilities: number[]): number {
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < pickCountProbabilities.length; i++) {
    // SAFETY: always in bounds
    cumulativeProbability += pickCountProbabilities[i]!;
    if (rand < cumulativeProbability) {
      return i + 1;
    }
  }

  return pickCountProbabilities.length; // In case probabilities don't sum up to 1
}

export const PICK_COUNT_PROBABILITIES = [
  [0.4, 0.3, 0.25, 0.05],
  [0.2, 0.4, 0.3, 0.1],
  [0.15, 0.25, 0.4, 0.2],
  [0.1, 0.25, 0.4, 0.25],
  [0.05, 0.15, 0.4, 0.4],
  [0.05, 0.5, 0.3, 0.6],
];

export const RARE_PROBABILITIES = [
  // TODO: remove when we have 4 rare + 4 common cat assets
  0, 0, 0, 0, 0,
  // 0.3, // common: 0.7,
  // 0.35, // common: 0.65,
  // 0.4, // common: 0.6,
  // 0.45, // common: 0.55,
  // 0.5, // common: 0.5,
];

export function placeCatsOnToys(
  toys: (number | null)[],
  cats: number[],
): (number | null)[] {
  // Create an array to represent the placements of cats
  const placements: (number | null)[] = new Array(toys.length).fill(
    null,
  ) as null[];

  // Shuffle the cats and toys to randomize the assignment
  const shuffledCats = [...cats].sort(() => Math.random() - 0.5);
  const toyIndices = toys
    .map((toy, index) => (toy !== null ? index : null))
    .filter((index) => index !== null) as number[];
  toyIndices.sort(() => Math.random() - 0.5);

  // Assign cats to toys
  for (const cat of shuffledCats) {
    if (toyIndices.length > 0) {
      // If there's a toy available, place the cat on the toy
      const toyIndex = toyIndices.pop()!;
      placements[toyIndex] = cat;
    } else {
      // If no toys are available, find an empty space (null)
      const emptySpaces = placements
        .map((place, index) => (place === null ? index : null))
        .filter((index) => index !== null) as number[];
      if (emptySpaces.length > 0) {
        // SAFETY: always in bounds
        const emptyIndex =
          emptySpaces[Math.floor(Math.random() * emptySpaces.length)]!;
        placements[emptyIndex] = cat;
      }
    }
  }

  return placements;
}
