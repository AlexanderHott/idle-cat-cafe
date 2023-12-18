"use client";
import { useEffect, useRef, useState } from "react";
import { WelcomeBackModal } from "./WelcomeBackModal";
import { atom, useAtom } from "jotai";
import { Shop } from "./Shop";

const LAST_LOGIN = "lastLogin";
const LAST_ACTIVE = "lastActive";
const DIFF = "diff";
const MONEY = "money";

// Welcome back reward
if (typeof window !== "undefined") {
  // Check if we're running in the browser.
  // ✅ Only runs once per app load
  const now = Math.floor(Date.now() / 1000);
  localStorage.setItem(LAST_LOGIN, now.toString());
  const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE) ?? "0");
  const diff = lastActive > 0 ? now - lastActive : 0;
  localStorage.setItem(DIFF, diff.toString());
  localStorage.setItem(LAST_ACTIVE, now.toString());
  const money = parseInt(localStorage.getItem(MONEY) ?? "10");

  const moneyMultiplier = 100;
  localStorage.setItem(MONEY, (money + diff * moneyMultiplier).toString());
  console.log(
    "WELCOME BACK",
    diff,
    moneyMultiplier,
    money,
    money + diff * moneyMultiplier,
  );
}

const moneyAtom = atom(parseInt(localStorage.getItem("money") ?? "10"));

export const moneyAtomWithPersistence = atom(
  (get) => get(moneyAtom),
  (get, set, newMoney: (m: number) => number) => {
    const newM = newMoney(get(moneyAtom));
    console.log("Setting money in local storage", newM);
    set(moneyAtom, newM);
    localStorage.setItem(MONEY, newM.toString());
  },
);

const lastActiveAtom = atom(parseInt(localStorage.getItem(LAST_ACTIVE) ?? "0"));

export const lastActiveAtomWithPersistence = atom(
  (get) => get(lastActiveAtom),
  (get, set, newTime: number) => {
    set(lastActiveAtom, newTime);
    localStorage.setItem(LAST_ACTIVE, newTime.toString());
  },
);

export default function Game() {
  if (typeof window === "undefined") {
    return null;
  }
  const [money, setMoney] = useAtom(moneyAtomWithPersistence);
  const [lastActive, setLastActive] = useAtom(lastActiveAtomWithPersistence);
  const diff = parseInt(localStorage.getItem(DIFF) ?? "0");
  const showWelcomeBackModal = diff > 10;

  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);

  // Update width on window resize
  useEffect(() => {
    const updateImageHeight = () => {
      const newWidth = ref.current ? ref.current.offsetWidth : 0;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateImageHeight);
    return () => window.removeEventListener("resize", updateImageHeight);
  }, []);
  // Update width on image load
  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current, loaded]);

  // last active time
  useEffect(() => {
    const interval = setInterval(() => {
      const unixTimestamp = Math.floor(Date.now() / 1000);
      setLastActive(unixTimestamp);
    }, 5_000 /*5s*/);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const HEIGHT = 400;
  const dWidth = Math.floor(width * 0.03);
  const dHeight = Math.floor((width / HEIGHT) * 10);
  const sWidth = Math.floor(width * 0.202);
  const sHeight = Math.floor((width / HEIGHT) * 10);

  return (
    <>
      <WelcomeBackModal defaultOpen={showWelcomeBackModal} diff={diff} />
      <img
        ref={ref}
        src="/space-h.jpeg"
        loading="eager"
        className="pointer-events-none -z-10 h-full max-w-none overflow-x-scroll"
        onLoad={() => setLoaded(true)}
      />
      <div className="fixed right-2 top-2 flex flex-col items-end gap-2 p-2">
        <div className="rounded bg-black p-2 text-white">${money}</div>
        <Shop />
      </div>
      <div
        className={`text-clamp absolute left-0 z-10 bg-black`}
        style={{
          top: `${dHeight}px`,
          left: `${dWidth}px`,
          width: width * 0.02,
          height: width * 0.01,
        }}
      >
        {width}
      </div>
      <div
        className={`text-clamp absolute left-0 z-10 bg-orange-500`}
        style={{
          top: `${sHeight}px`,
          left: `${sWidth}px`,
          width: width * 0.014,
          height: width * 0.01,
        }}
      >
        {width}
      </div>
    </>
  );
}
