/**
 * See PROGRESSION.md
 */

/**
 * Calculate the profit
 */
export function calculateProfit(
  menuItemsOwned: number,
  baristasHired: number,
  numCommonCats: number,
  numRareCats: number,
  secondsAway: number,
) {
  return (
    (menu(menuItemsOwned) + barista(baristasHired)) *
    (numCommonCats * 1.5 + numRareCats * 5) *
    secondsAway
  );
}

function menu(x: number) {
  return 0.0001 * Math.E ** (0.7 * x);
}

function barista(x: number) {
  return 0.00001 * Math.E ** (1.95 * x);
}
