"use client";

import { LegacyRef, Ref, forwardRef } from "react";
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
import { useAtom } from "jotai";
import { CAT_TOYS, Shop } from "./Shop";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { calculateProfit } from "~/lib/progression";
import {
  PICK_COUNT_PROBABILITIES,
  RARE_PROBABILITIES,
  pickRandomItems,
  placeCatsOnToys,
} from "~/lib/spawning";

import {
  baristasAtom as baristasAtom,
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
  uncheckedGetSeenCats,
  uncheckedSetCurrentCats,
  uncheckedSetDiff,
  uncheckedSetLastActive,
  uncheckedSetLastCatSpawn,
  uncheckedSetLastLogin,
  uncheckedSetMoney,
  uncheckedSetSeenCats,
} from "~/lib/gameState";
import { type DialogTriggerProps } from "@radix-ui/react-dialog";
import { HelpInfo } from "./HelpInfo";
import { SeenCats } from "./SeenCats";

type Rarity = "COMMON" | "RARE";
export type CatT = {
  id: number;
  name: string;
  desc: string;
  assetPath: string;
  rarity: Rarity;
};
const RARE_CATS: CatT[] = [
  {
    id: 0,
    name: "Murchyk",
    desc: "Loves playing with plastic bags",
    assetPath: "/assets/cats/murchyk/",
    rarity: "RARE",
  },
  {
    id: 1,
    name: "Socrates",
    desc: "Uncovering the secrets of the universe",
    assetPath: "/assets/cats/socrates/",
    rarity: "RARE",
  },
  {
    id: 2,
    name: "Jack",
    desc: "",
    assetPath: "/assets/cats/jack/",
    rarity: "RARE",
  },
  {
    id: 3,
    name: "Pepsi",
    desc: "",
    assetPath: "/assets/cats/pepsi/",
    rarity: "RARE",
  },
];

const COMMON_CATS: CatT[] = [];

export const CATS = RARE_CATS.concat(COMMON_CATS);

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

  const spawnedBefore = lastCatSpawn !== 0;
  const shouldRespawn = diff > 60 * 60 * 6;
  if (!spawnedBefore || shouldRespawn) {
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
    const seenCats = new Set(uncheckedGetSeenCats());
    catPlacements.filter((c) => c !== null).forEach((c) => seenCats.add(c!));
    console.log("Setting seen cats", seenCats, Array.from(seenCats));
    uncheckedSetSeenCats(Array.from(seenCats));
    console.log("ucg sc", uncheckedGetSeenCats());
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
  const [money] = useAtom(moneyAtom);
  const [, setLastActive] = useAtom(lastActiveAtom);
  const [diff] = useAtom(diffAtom);
  const showWelcomeBackModal = diff > 60;
  const [baristas] = useAtom(baristasAtom);

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

  ///
  /// Cat Placement
  ///
  const CAT_PLACEMENT_1 = {
    bottom: height * 0.1,
    left: width * 0.42,
  };
  const CAT_PLACEMENT_2 = {
    bottom: height * 0.1,
    left: (width * 2) / 3,
  };
  const CAT_PLACEMENT_3 = {
    bottom: height * 0.1,
    left: width * 0.81,
  };

  ///
  /// Barista
  ///
  const showBarista = baristas.length > 0;

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
      {showBarista && (
        <div
          className="absolute z-20 bg-cyan-500"
          style={{
            width: width * 0.05,
            height: width * 0.05,
            top: height * 0.51,
            left: width * 0.16,
          }}
        />
      )}
      {showBarista && (
        <img
          src="/assets/baristas/axel-o/0.gif"
          className="absolute z-30"
          style={{
            left: width * 0.12,
            top: height * 0.2731,
            height: height * 0.4,
          }}
        />
      )}
      {/*<img
        src="/assets/cats/murchyk/frog-bed.webp"
        alt="cat1"
        loading="eager"
        className="absolute"
        style={cat1Pos}
      />*/}
      <div className="fixed bottom-2 right-2 top-2 flex flex-col items-end justify-between gap-2 p-2">
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 rounded bg-primary p-2">
            <Image width={20} height={20} alt="$" src="/assets/coin.png" />
            <span className="text-white">{Math.round(money)}</span>
          </div>
          <Shop />
          <SeenCats />
        </div>
        <HelpInfo />
      </div>
      {/* Add cat toy buttons */}
      {/*<ChooseToy style={TOY_BUTTON_1} index={1} height={height} />*/}
      {/*<ChooseToy style={TOY_BUTTON_2} index={2} height={height} />*/}
      {/*<ChooseToy style={TOY_BUTTON_3} index={3} height={height} />*/}
      <CatToySlot style={CAT_PLACEMENT_1} index={1} height={height} />
      <CatToySlot style={CAT_PLACEMENT_2} index={2} height={height} />
      <CatToySlot style={CAT_PLACEMENT_3} index={3} height={height} />
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
  style: { bottom: number; left: number; height?: number };
}) {
  const [currentToys] = useAtom(currentToysAtom);
  const [currentCats] = useAtom(currentCatsAtom);
  const hasCat = currentCats[index] !== null;
  const hasToy = currentToys[index] !== null;
  // console.log("slot", index, "hascat", hasCat, "hastoy", hasToy);

  const catIdx = currentCats[index]!;
  if (!hasToy) {
    // console.log("Slot", index, "no cat");
    // console.log("debug", index, currentCats);
    const cat = CATS[catIdx]!;
    const flipped = Math.random() > 0.5;
    return (
      <>
        {hasCat && (
          <img
            src={cat.assetPath + "default.gif"}
            className={`absolute -translate-x-1/2 transform ${
              flipped ? "-scale-x-100" : ""
            }`}
            style={{
              left: style.left,
              bottom: height * 0.354,
              height: height * 0.25,
            }}
          />
        )}
        <ChooseToy style={style} height={height} index={index} />
      </>
    );
  }

  const toy = CAT_TOYS[currentToys[index]!]!;
  if (hasCat) {
    const asset = toy.cats[catIdx]!;
    // console.log("Slot", index, "hasToy", toy, catIdx, toy.cats[catIdx]);
    return (
      <img
        src={asset.src}
        className="absolute -translate-x-1/2 transform"
        style={{
          left: style.left,
          bottom: 0,
          height: height * asset.style.height,
        }}
      />
    );
  }

  return (
    <img
      src={toy.image}
      className="absolute -translate-x-1/2 transform"
      style={{
        left: style.left,
        bottom: 0,
        height: height * (style.height ?? 1),
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

//
const ChooseToyButton = forwardRef<
  HTMLElement,
  {
    currentToy: number | null;
    style: { bottom: number; left: number };
    height: number;
  } & DialogTriggerProps &
    React.RefAttributes<HTMLElement>
>(function ChooseToyButton(
  {
    currentToy,
    style,
    height,
    ...props
  }: {
    currentToy: number | null;
    style: { bottom: number; left: number };
    height: number;
  } & DialogTriggerProps &
    React.RefAttributes<HTMLElement>,
  ref,
) {
  if (currentToy === null) {
    return (
      <Button
        {...props}
        ref={ref as Ref<HTMLButtonElement>}
        className={`absolute z-20 h-8 w-8 rounded-full`}
        style={style}
      >
        +
      </Button>
    );
  }
  const toy = CAT_TOYS[currentToy]!;
  return (
    // @ts-expect-error bad img props
    <img
      src={toy.image}
      className="absolute -translate-x-1/2 transform"
      style={{ left: style.left, bottom: 0, height: height * toy.height }}
      {...props}
      ref={ref as LegacyRef<HTMLImageElement>}
    />
  );
});
