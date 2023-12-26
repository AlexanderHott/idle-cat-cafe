"use client";
import { atom } from "jotai";
import { atomWithStorage, RESET } from "jotai/utils";

//
// const moneyAtom = atom(
//   parseInt(localStorage.getItem("money") || "0"),
// );
//
// export const moneyAtomWithPersistence = atom(
//   (get) => get(moneyAtom),
//   (get, set, newMoney: (m: number) => number) => {
//     const newM = newMoney(get(moneyAtom));
//     console.log("Setting money in local storage", newM)
//     set(moneyAtom, newM);
//     localStorage.setItem("money", newM.toString());
//   },
// );

// const lastLoginAtom = atom(
//   parseInt(localStorage.getItem("lastLogin") || "0"),
// );
//
// export const lastLoginAtomWithPersistence = atom(
//   (get) => get(lastLoginAtom),
//   (get, set, newlastLogin: number) => {
//     set(lastLoginAtom, newlastLogin);
//     localStorage.setItem("lastLogin", newlastLogin.toString());
//   },
// );

export const LAST_LOGIN = "lastLogin";
export const LAST_ACTIVE = "lastActive";
export const DIFF = "diff";
export const MONEY = "money";
export const MENU_ITEMS = "menuItems";
export const BARISTAS = "baristas";
export const CAT_TOYS = "catToys";
export const LAST_CAT_SPAWN = "lastCatSpawn";
export const CURRENT_CATS = "currentCats";
export const CURRENT_TOYS = "currentToys";

function generatePersistantAtom<T>(localStorageKey: string, defaultValue: T) {
  const uncheckedGet = () => {
    const cachedValue = localStorage.getItem(localStorageKey);
    let value: T;
    if (cachedValue == null) {
      value = defaultValue;
    } else {
      value = JSON.parse(cachedValue) as T;
    }
    return value;
  };

  const uncheckedSet = (value: T) =>
    localStorage.setItem(localStorageKey, JSON.stringify(value));

  const defaultAtom = atom<T>(uncheckedGet());

  const atomWithPersistence = atom(
    (get) => get(defaultAtom),
    (get, set, newValue: T) => {
      set(defaultAtom, newValue);
      localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    },
  );
  return { atom: atomWithPersistence, get: uncheckedGet, set: uncheckedSet };
}

export const {
  atom: catToyAtom,
  get: uncheckedGetCatToys,
  set: uncheckedSetCatToys,
} = generatePersistantAtom<number[]>(CAT_TOYS, []);

export const {
  atom: lastLoginAtom,
  get: uncheckedGetLastLogin,
  set: uncheckedSetLastLogin,
} = generatePersistantAtom<number>(LAST_LOGIN, 0);

export const {
  atom: lastActiveAtom,
  get: uncheckedGetLastActive,
  set: uncheckedSetLastActive,
} = generatePersistantAtom<number>(LAST_ACTIVE, 0);

export const {
  atom: diffAtom,
  get: uncheckedGetDiff,
  set: uncheckedSetDiff,
} = generatePersistantAtom<number>(DIFF, 0);

export const {
  atom: lastCatSpawnAtom,
  get: uncheckedGetLastCatSpawn,
  set: uncheckedSetLastCatSpawn,
} = generatePersistantAtom<number>(LAST_CAT_SPAWN, 0);

export const {
  atom: currentCatsAtom,
  get: uncheckedGetCurrentCats,
  set: uncheckedSetCurrentCats,
} = generatePersistantAtom<(number | null)[]>(CURRENT_CATS, [
  null,
  null,
  null,
  null,
]);

export const {
  atom: moneyAtom,
  get: uncheckedGetMoney,
  set: uncheckedSetMoney,
} = generatePersistantAtom<number>(MONEY, 20);

export const {
  atom: menuItemsAtom,
  get: uncheckedGetMenuItems,
  set: uncheckedSetMenuItems,
} = generatePersistantAtom<number[]>(MENU_ITEMS, []);

export const {
  atom: birastasAtom,
  get: uncheckedGetBaristas,
  set: uncheckedSetBaristas,
} = generatePersistantAtom<number[]>(BARISTAS, []);

export const {
  atom: currentToysAtom,
  get: uncheckedGetCurrentToys,
  set: uncheckedSetCurrentToys,
} = generatePersistantAtom<(number | null)[]>(CURRENT_TOYS, [
  null,
  null,
  null,
  null,
]);

// export const {
//   atom: currentToysAtom,
//   get: uncheckedGetCurrentToys,
//   set: uncheckedSetCurrentToys,
// } = generatePersistantAtom<(number | null)[]>(CURRENT_TOYS, [
//   null,
//   null,
//   null,
//   null,
// ]);
