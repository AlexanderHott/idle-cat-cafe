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

const PURCHASED_CAT_TOYS = "purchasedCatToys";

const purchasedCatToysAtom = atom<number[]>(
  JSON.parse(localStorage.getItem(PURCHASED_CAT_TOYS) ?? "[]") as number[],
);

export const purchasedCatToysAtomWithPersistence = atom(
  (get) => get(purchasedCatToysAtom),
  (get, set, newArr: number[]) => {
    set(purchasedCatToysAtom, newArr);
    localStorage.setItem(PURCHASED_CAT_TOYS, JSON.stringify(newArr));
  },
);

const HIRED_EMPLOYES = "hiredEmployes";

const hiredEmployeesAtom = atom<number[]>(
  JSON.parse(localStorage.getItem(HIRED_EMPLOYES) ?? "[]") as number[],
);

export const hiredEmployeesAtomWithPersistence = atom(
  (get) => get(hiredEmployeesAtom),
  (get, set, newArr: number[]) => {
    set(hiredEmployeesAtom, newArr);
    localStorage.setItem(HIRED_EMPLOYES, JSON.stringify(newArr));
  },
);

const OWNED_MENU_ITEMS = "ownedMenuItems";

const ownedMenuItemsAtom = atom<number[]>(
  JSON.parse(localStorage.getItem(OWNED_MENU_ITEMS) ?? "[]") as number[],
);

export const ownedMenuItemsAtomWithPersistence = atom(
  (get) => get(ownedMenuItemsAtom),
  (get, set, newArr: number[]) => {
    set(ownedMenuItemsAtom, newArr);
    localStorage.setItem(OWNED_MENU_ITEMS, JSON.stringify(newArr));
  },
);
