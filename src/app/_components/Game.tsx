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
  placeCatsOnToys,
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
  uncheckedGetCurrentToys,
  uncheckedGetLastActive,
  uncheckedGetLastCatSpawn,
  uncheckedGetMenuItems,
  uncheckedGetMoney,
  uncheckedSetCurrentCats,
  uncheckedSetDiff,
  uncheckedSetLastActive,
  uncheckedSetLastCatSpawn,
  uncheckedSetLastLogin,
  uncheckedSetMoney,
} from "~/lib/gameState";
import { DialogTriggerProps } from "@radix-ui/react-dialog";

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

  let catPositions = uncheckedGetCurrentCats();
  const currentCats = catPositions.filter((c) => c !== null) as number[];
  if (lastCatSpawn == 0 || diff > 60 * 60 * 6) {
    catPositions = pickRandomItems(
      CATS, // TODO: COMMON_CATS
      [], // TODO: RARE_CATS
      PICK_COUNT_PROBABILITIES[catToysOwned]!,
      RARE_PROBABILITIES[catToysOwned]!,
    ).map((c) => c.id);

    const currentToys = uncheckedGetCurrentToys();
    const catPlacements = placeCatsOnToys(
      currentToys,
      catPositions.filter((c) => c !== null) as number[],
    );
    uncheckedSetCurrentCats(catPlacements);
    console.log("set cc", catPlacements);
    uncheckedSetLastCatSpawn(now);
    console.log("[respawn] Cat placements", catPlacements);
  } else {
    console.log("[old spawn] cat placements", catPositions);
  }

  // Welcome back reward
  const money = uncheckedGetMoney();

  const menuItemsOwned = uncheckedGetMenuItems().length;
  const baristasHired = uncheckedGetBaristas().length;
  const profit = calculateProfit(
    menuItemsOwned,
    baristasHired,
    currentCats.length, // TODO: split common and rare cats
    0,
    diff,
  );
  // console.log("money", money);
  // console.log("profit", profit);
  // console.log("diff", diff);
  uncheckedSetMoney(money + profit);
}

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
  // TODO switch width and height to jotai Atoms
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

    return () => clearInterval(interval);
  }, []);

  const TOY_BUTTON_1 = {
    bottom: height * 0.1,
    left: width * 0.42,
  };
  const TOY_BUTTON_2 = {
    bottom: height * 0.1,
    left: (width * 2) / 3,
  };
  const TOY_BUTTON_3 = {
    bottom: height * 0.1,
    left: width * 0.81,
  };

  ///
  /// Cat Placement
  ///

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
      {/* TODO: Fix gif transparency */}
      <div
        className="absolute z-20 bg-cyan-500"
        style={{
          width: width * 0.05,
          height: width * 0.05,
          top: height * 0.51,
          left: width * 0.16,
        }}
      />
      <img
        src="/assets/baristas/axel-o/0.gif"
        className="absolute z-30"
        style={{
          left: width * 0.12,
          top: height * 0.2731,
          height: height * 0.4,
        }}
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
      {/*<ChooseToy style={TOY_BUTTON_1} index={1} height={height} />*/}
      {/*<ChooseToy style={TOY_BUTTON_2} index={2} height={height} />*/}
      {/*<ChooseToy style={TOY_BUTTON_3} index={3} height={height} />*/}
      <CatToySlot style={TOY_BUTTON_1} index={1} height={height} />
      <CatToySlot style={TOY_BUTTON_2} index={2} height={height} />
      <CatToySlot style={TOY_BUTTON_3} index={3} height={height} />
    </>
  );
}

function CatToySlot({
  style,
  height,
  index,
}: {
  height: number;
  index: number;
  style: { bottom: number; left: number };
}) {
  const [currentToys] = useAtom(currentToysAtom);
  const [currentCats] = useAtom(currentCatsAtom);
  // const firstCat = currentCats[0] ?? 0;
  // const firstToyIdx = currentToys.filter((v) => v !== null)[0]!;
  // const firstToy = CAT_TOYS[firstToyIdx]!;
  const hasCat = currentCats[index] !== null;
  const hasToy = currentToys[index] !== null;
  console.log("slot", index, "hascat", hasCat, "hastoy", hasToy);
  if (!hasCat) {
    console.log("Slot", index, "no cat");
    return <ChooseToy style={style} height={height} index={index} />;
  }
  console.log("debug", index, currentCats);
  const catIdx = currentCats[index]!;

  if (hasToy) {
    const toy = CAT_TOYS[currentToys[index]!]!;
    console.log("Slot", index, "hasToy", toy, catIdx, toy.cats[catIdx]);
    return (
      <img
        src={toy.cats[catIdx]}
        className="absolute -translate-x-1/2 transform"
        style={{
          left: style.left,
          bottom: 0,
          height: height * toy.height,
        }}
      />
    );
  }
  const cat = CATS[catIdx]!;
  return (
    <img
      src={cat.assetPath + "default.gif"}
      className="absolute -translate-x-1/2 transform"
      style={{
        left: style.left,
        bottom: 0,
        height: height * 0.1,
      }}
    />
  );
}

function ChooseToy({
  style,
  index,
  height,
}: {
  style: { left: number; bottom: number };
  index: number;
  height: number;
}) {
  const [currentToys, setCurrentToys] = useAtom(currentToysAtom);
  const [catToys] = useAtom(catToyAtom);
  const unequpiedToys =
    currentToys.filter((v) => v !== null).length < catToys.length;
  return (
    <>
      {unequpiedToys && currentToys[index] === null && (
        <div
          className="absolute z-10 h-8 w-8 animate-ping rounded-full bg-slate-900"
          style={style}
        />
      )}

      <Sheet>
        <SheetTrigger asChild>
          <ChooseToyButton
            style={style}
            currentToy={currentToys[index]!}
            height={height}
          />
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
              <div key={toy!.id}>
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

function ChooseToyButton({
  currentToy,
  style,
  height,
  ...props
}: {
  currentToy: number | null;
  style: { bottom: number; left: number };
  height: number;
} & DialogTriggerProps &
  React.RefAttributes<HTMLButtonElement>) {
  if (currentToy === null) {
    return (
      <Button
        {...props}
        className={`absolute z-20 h-8 w-8 rounded-full`}
        style={style}
      >
        +
      </Button>
    );
  }
  const toy = CAT_TOYS[currentToy]!;
  return (
    // @ts-expect-error trust me (button props on img element still sort of works)
    <img
      src={toy.image}
      className="absolute -translate-x-1/2 transform"
      style={{ left: style.left, bottom: 0, height: height * toy.height }}
      {...props}
    />
  );
}
