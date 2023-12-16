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
