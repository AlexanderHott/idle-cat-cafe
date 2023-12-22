"use client";
import { useEffect, useRef, useState } from "react";
import { WelcomeBackModal } from "./WelcomeBackModal";
import { atom, useAtom } from "jotai";
import { Shop } from "./Shop";
import Image from "next/image";
import { Cat } from "lucide-react";
import { Button } from "~/components/ui/button";

const LAST_LOGIN = "lastLogin";
const LAST_ACTIVE = "lastActive";
const DIFF = "diff";
const MONEY = "money";

type Rarity = "COMMON" | "RARE" | "SUPER_RARE";
type Cat = {
  name: string;
  image: string;
  rarity: Rarity;
};
const CATS: Cat[] = [
  {
    name: "Peanut Butter",
    image: "/assets/cats/peanut_butter.jpg",
    rarity: "COMMON",
  },
  {
    name: "Shadow",
    image: "/assets/cats/shadow.jpg",
    rarity: "RARE",
  },
  {
    name: "Socrates",
    image: "/assets/cats/socrates.jpg",
    rarity: "SUPER_RARE",
  },
];

const COMMON_SPAWN = 0.8;
const RARE_SPAWN = 0.15;
const SUPER_RARE_SPAWN = 0.05;

const ONE_CAT = 0.4;
const TWO_CAT = 0.3;
const THREE_CAT = 0.2;
const FOUR_CAT = 0.1;

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
  const [money, setMoney] = useAtom(moneyAtomWithPersistence);
  const [lastActive, setLastActive] = useAtom(lastActiveAtomWithPersistence);
  const diff = parseInt(localStorage.getItem(DIFF) ?? "0");
  const showWelcomeBackModal = diff > 10;

  ///
  /// Object positioning
  ///

  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Update width on window resize
  useEffect(() => {
    const updateImageDims = () => {
      const newWidth = ref.current ? ref.current.offsetWidth : 0;
      setWidth(newWidth);
      const newHeight = ref.current ? ref.current.offsetHeight : 0;
      setHeight(newHeight);
    };

    window.addEventListener("resize", updateImageDims);
    return () => window.removeEventListener("resize", updateImageDims);
  }, []);
  // Update width on image load
  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
    setHeight(ref.current ? ref.current.offsetHeight : 0);
  }, [ref.current, loaded]);

  // last active time
  useEffect(() => {
    const interval = setInterval(() => {
      const unixTimestamp = Math.floor(Date.now() / 1000);
      setLastActive(unixTimestamp);
    }, 5_000 /*5s*/);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const cat1Pos = {
    top: height * 0.4925, // percent of height
    left: width * 0.3, // percent of width
    width: width * 0.03,
    height: width * 0.03,
  };

  const sWidth = Math.floor(width * 0.202);
  const sHeight = Math.floor((width / height) * 10);

  ///
  /// calculate cat spawns
  ///
  // num cats
  let numCats: number;
  let rand = Math.random();
  let todayCats: Cat[];
  if (rand <= FOUR_CAT) {
    numCats = 4;
  } else if (rand <= FOUR_CAT + THREE_CAT) {
    numCats = 3;
  } else if (rand <= FOUR_CAT + THREE_CAT + TWO_CAT) {
    numCats = 2;
  } else {
    numCats = 1;
  }

  for (let i = 0; i < numCats; i++) {
    rand = Math.random();
    // const cat =
    // todayCats.push(undefined);
  }

  return (
    <>
      <WelcomeBackModal defaultOpen={showWelcomeBackModal} diff={diff} />
      <Image
        ref={ref}
        width={window.innerHeight * 1692 / 505 }
        height={window.innerHeight}
        src="/assets/bg.webp"
        alt="background"
        loading="eager"
        priority
        className="rendering-pixelated pointer-events-none -z-10 h-full max-w-none overflow-x-scroll "
        onLoad={() => setLoaded(true)}
      />
      <img
        src="/assets/cat.png"
        loading="eager"
        className="absolute"
        style={cat1Pos}
      />
      <div className="fixed right-2 top-2 flex flex-col items-end gap-2 p-2">
        <div className="rounded bg-black p-2 text-white">${money}</div>
        <Shop />
        <Button size="icon">
          <Cat />
        </Button>
      </div>
      {/*<div
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
      </div>*/}
    </>
  );
}
