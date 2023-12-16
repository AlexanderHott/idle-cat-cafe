"use client";

// . user logs in .
// set login time in ls
// set diff in ls
// . game component mounts .
// update money
// register interval to set lastActive time

import { useEffect, useRef, useState } from "react";
import { WelcomeBackModal } from "./WelcomeBackModal";
import { atom, useAtom } from "jotai";

if (typeof window !== "undefined") { // Check if we're running in the browser.
  // ✅ Only runs once per app load
  const now = Math.floor(Date.now() / 1000);
  localStorage.setItem("lastLogin", now.toString());
  const lastActive = parseInt(localStorage.getItem("lastActive") ?? "0")
  const diff = (now - lastActive)
  localStorage.setItem("diff", diff.toString());
  localStorage.setItem("lastActive", now.toString())
  const money = parseInt(localStorage.getItem("money") ?? "0")

  const moneyMultiplier = 100;
  localStorage.setItem("money", (money + diff * moneyMultiplier).toString())
  console.log("WELCOME BACK", diff, moneyMultiplier, money, money + diff * moneyMultiplier)
}

const moneyAtom = atom(
  parseInt(localStorage.getItem("money") ?? "0"),
);

export const moneyAtomWithPersistence = atom(
  (get) => get(moneyAtom),
  (get, set, newMoney: (m: number) => number) => {
    const newM = newMoney(get(moneyAtom));
    console.log("Setting money in local storage", newM)
    set(moneyAtom, newM);
    localStorage.setItem("money", newM.toString());
  },
);

const lastActiveAtom = atom(
  parseInt(localStorage.getItem("lastActive") ?? "0"),
);

export const lastActiveAtomWithPersistence = atom(
  (get) => get(lastActiveAtom),
  (get, set, newTime: number) => {
    set(lastActiveAtom, newTime);
    localStorage.setItem("lastActive", newTime.toString());
  },
);

export default function Game() {
  console.log("Mount game")
  if (typeof window === "undefined") {
    return null;
  }
  const [money, setMoney] = useAtom(moneyAtomWithPersistence)
  const [lastActive, setLastActive] = useAtom(lastActiveAtomWithPersistence)
  const diff = parseInt(localStorage.getItem("diff") ?? "0")
  const showWelcomeBackModal = diff > 10;

  // const [gameState, setGameState] = useLocalStorage("gameState", {});
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
  const dHeight = Math.floor(width / HEIGHT * 10);
  const sWidth = Math.floor(width * 0.202);
  const sHeight = Math.floor(width / HEIGHT * 10);

  return (
    <>
      <WelcomeBackModal
        defaultOpen={showWelcomeBackModal}
        diff={diff}
      />
      <img
        ref={ref}
        src="/space-h.jpeg"
        loading="eager"
        className="-z-10 overflow-x-scroll h-full max-w-none pointer-events-none"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute top-2 right-2 bg-red-500 p-2 text-white rounded">
        ${money}
      </div>
      <div
        className={`absolute bg-black left-0 z-10 text-clamp`}
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
        className={`absolute bg-orange-500 left-0 z-10 text-clamp`}
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
