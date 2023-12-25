"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useEffect, useRef, useState } from "react";
import { WelcomeBackModal } from "./WelcomeBackModal";
import { atom, useAtom } from "jotai";
import { CAT_TOYS, Shop } from "./Shop";
import Image from "next/image";
import { Cat } from "lucide-react";
import { Button } from "~/components/ui/button";
import { calculateProfit } from "~/lib/progression";
import {
  PICK_COUNT_PROBABILITIES,
  RARE_PROBABILITIES,
  pickRandomItems,
} from "~/lib/spawning";

import {
  catToyAtom,
  currentCatsAtom,
  currentToysAtom,
  diffAtom,
  lastActiveAtom,
  moneyAtom,
  uncheckedGetBaristas,
  uncheckedGetCatToys,
  uncheckedGetCurrentCats,
  uncheckedGetLastActive,
  uncheckedGetLastCatSpawn,
  uncheckedGetMenuItems,
  uncheckedGetMoney,
  uncheckedSetCurrentCats,
  uncheckedSetDiff,
  uncheckedSetLastActive,
  uncheckedSetLastLogin,
  uncheckedSetMoney,
} from "~/lib/gameState";

type Rarity = "COMMON" | "RARE";
type Cat = {
  id: number;
  name: string;
  desc: string;
  assetPath: string;
  rarity: Rarity;
};

const RARE_CATS: Cat[] = [
  {
    id: 0,
    name: "Murchyk",
    desc: "Loves playing with plastic bags",
    assetPath: "/assets/cats/murchyk/",
    rarity: "RARE",
  },
  {
    id: 1,
    name: "Murchyk 2",
    desc: "Loves playing with plastic bags",
    assetPath: "/assets/cats/murchyk/",
    rarity: "RARE",
  },
  {
    id: 2,
    name: "Murchyk 3",
    desc: "Loves playing with plastic bags",
    assetPath: "/assets/cats/murchyk/",
    rarity: "RARE",
  },
  {
    id: 3,
    name: "Murchyk 4",
    desc: "Loves playing with plastic bags",
    assetPath: "/assets/cats/murchyk/",
    rarity: "RARE",
  },
];
const COMMON_CATS: Cat[] = [];

const CATS = RARE_CATS.concat(COMMON_CATS);

// Check if we're running in the browser.
if (typeof window !== "undefined") {
  // ✅ Only runs once per app load

  // Idle Time
  const now = Math.floor(Date.now() / 1000);
  uncheckedSetLastLogin(now);
  const lastActive = uncheckedGetLastActive();
  const diff = lastActive > 0 ? now - lastActive : 0;
  uncheckedSetDiff(diff);
  uncheckedSetLastActive(now);

  // Cat spawning
  const catToysOwned = uncheckedGetCatToys().length;
  const lastCatSpawn = uncheckedGetLastCatSpawn();

  let cats = uncheckedGetCurrentCats();
  if (lastCatSpawn == 0 || diff > 60 * 60 * 6) {
    cats = pickRandomItems(
      CATS, // TODO: COMMON_CATS
      [], // TODO: RARE_CATS
      PICK_COUNT_PROBABILITIES[catToysOwned]!,
      RARE_PROBABILITIES[catToysOwned]!,
    ).map((c) => c.id);
    uncheckedSetCurrentCats(cats);
  }

  // Welcome back reward
  const money = uncheckedGetMoney();

  const menuItemsOwned = uncheckedGetMenuItems().length;
  const baristasHired = uncheckedGetBaristas().length;
  const profit = calculateProfit(
    menuItemsOwned,
    baristasHired,
    cats.length, // TODO: split common and rare cats
    0,
    diff,
  );
  // console.log("money", money);
  // console.log("profit", profit);
  // console.log("diff", diff);
  uncheckedSetMoney(money + profit);
}

// const moneyAtom = atom(parseInt(localStorage.getItem("money") ?? "20"));
//
// export const moneyAtomWithPersistence = atom(
//   (get) => get(moneyAtom),
//   (get, set, newMoney: (m: number) => number) => {
//     const newM = newMoney(get(moneyAtom));
//     console.log("Setting money in local storage", newM);
//     set(moneyAtom, newM);
//     localStorage.setItem(MONEY, newM.toString());
//   },
// );

// const lastActiveAtom = atom(parseInt(localStorage.getItem(LAST_ACTIVE) ?? "0"));
//
// export const lastActiveAtomWithPersistence = atom(
//   (get) => get(lastActiveAtom),
//   (get, set, newTime: number) => {
//     set(lastActiveAtom, newTime);
//     localStorage.setItem(LAST_ACTIVE, newTime.toString());
//   },
// );

export default function Game() {
  const [money, setMoney] = useAtom(moneyAtom);
  const [lastActive, setLastActive] = useAtom(lastActiveAtom);
  const [diff] = useAtom(diffAtom);
  const [currentCats] = useAtom(currentCatsAtom);
  const showWelcomeBackModal = diff > 60;
  const [currentToys, setCurrentToys] = useAtom(currentToysAtom);

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
      console.log("[update dims]", newWidth, newHeight, newWidth / newHeight);
    };

    window.addEventListener("resize", updateImageDims);
    window.addEventListener("orientationchange", updateImageDims);
    return () => {
      window.removeEventListener("resize", updateImageDims);
      window.removeEventListener("orientationchange", updateImageDims);
    };
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

  const BG_WIDTH = 1692;
  const BG_HEIGHT = 615;

  const FROG_BED_W = 374;
  const FROG_BED_H = 244;

  const cat1Pos = {
    bottom: 0,
    left: width * 0.33, // percent of width
    width: width * 0.15,
    height: (FROG_BED_W / FROG_BED_H) * 110,
  };

  const TOY_BUTTON_1 = {
    bottom: height * 0.1,
    left: width * 0.42,
  };

  return (
    <>
      <WelcomeBackModal defaultOpen={showWelcomeBackModal} diff={diff} />
      <img
        ref={ref}
        // width={Math.floor((window.innerHeight * BG_WIDTH) / BG_HEIGHT)}
        // height={window.innerHeight}
        src="/assets/background.webp"
        alt="background"
        loading="eager"
        // priority
        className="rendering-crisp-edges pointer-events-none -z-20 h-full max-w-none overflow-x-scroll "
        onLoad={() => setLoaded(true)}
      />
      {/*<img
        src="/assets/cats/murchyk/frog-bed.webp"
        alt="cat1"
        loading="eager"
        className="absolute"
        style={cat1Pos}
      />*/}
      <div className="fixed right-2 top-2 flex flex-col items-end gap-2 p-2">
        <div className="flex items-center gap-2 rounded bg-black p-2">
          <Image width={20} height={20} alt="$" src="/assets/coin.png" />
          <span className="text-white">{money}</span>
        </div>
        <Shop />
        <Button size="icon">
          <Cat />
        </Button>
      </div>
      {/* Add cat toy buttons */}
      <ChooseToy style={TOY_BUTTON_1} index={1} />
      {/*<div
        className={`text-clamp absolute left-0 z-10 bg-black`}
        style={{
          top: `${dHeight}px`,
          left: `${dWidth}px`,width
          width: width * 0.02,
          height: widh * 0.01,
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

function ChooseToy({
  style,
  index,
}: {
  style: { left: number; bottom: number };
  index: number;
}) {
  const unequpiedToys = false;
  const [currentToys, setCurrentToys] = useAtom(currentToysAtom);
  const [catToys] = useAtom(catToyAtom);
  return (
    <>
      {unequpiedToys && <div />}
      {currentToys[index] === null && (
        <div
          className="absolute z-10 h-8 w-8 animate-ping rounded-full bg-slate-900"
          style={style}
        />
      )}

      <Sheet>
        <SheetTrigger asChild>
          {currentToys[index] !== null ? (
            <img
              src={CAT_TOYS[currentToys[index]!]!.image}
              className="absolute -translate-x-1/2 transform"
              style={{ left: style.left, bottom: 0 }}
            />
          ) : (
            <Button
              className={`absolute z-20 h-8 w-8 rounded-full`}
              style={style}
            >
              +
            </Button>
          )}
        </SheetTrigger>
        <SheetContent className="flex grow-0 flex-col">
          <SheetHeader>
            <SheetTitle>Equip a cat toy</SheetTitle>
            <SheetDescription>
              Put down a fun item for cats to attract more cats.
            </SheetDescription>
          </SheetHeader>
          {catToys
            .map((idx) => CAT_TOYS[idx])
            .map((toy) => (
              <div>
                <div>{toy!.name}</div>
                <Button
                  disabled={currentToys.includes(toy!.id)}
                  onClick={() =>
                    setCurrentToys(
                      currentToys.map((t, idx) =>
                        idx === index ? toy!.id : t,
                      ),
                    )
                  }
                >
                  Equip
                </Button>
              </div>
            ))}
          <Button
            onClick={() =>
              setCurrentToys(
                currentToys.map((t, idx) => (idx === index ? null : t)),
              )
            }
            variant={"destructive"}
            disabled={currentToys[index] === null}
          >
            Clear
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
