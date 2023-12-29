"use client";
import Image from "next/image";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  baristasAtom,
  currentCatsAtom,
  menuItemsAtom,
  moneyAtom,
} from "~/lib/gameState";
import { calculateProfit } from "~/lib/progression";

export function WelcomeBackModal({
  defaultOpen,
  diff,
}: {
  defaultOpen?: boolean;
  diff: number;
}) {
  const [money] = useAtom(moneyAtom);

  const [menuItems] = useAtom(menuItemsAtom);
  const [baristas] = useAtom(baristasAtom);
  const [cats] = useAtom(currentCatsAtom);

  const profit = calculateProfit(
    menuItems.length,
    baristas.length,
    cats.filter((c) => c !== null).length, // TODO: split common and rare cats
    0,
    diff,
  );
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-amber-900 dark:text-amber-50">
            Welcome Back!
          </DialogTitle>
          <DialogDescription asChild>
            <>
              <p className="dark:text-amber-40 text-amber-500">
                Look what you got while you were away!
              </p>
              <div className="dark:text-amber-40 pt-4 text-amber-500 ">
                <Image
                  src="/assets/coin.png"
                  className="mr-2 inline"
                  height={20}
                  width={20}
                  alt="$"
                />
                {Math.floor(profit)}
              </div>
            </>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
