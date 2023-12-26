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
  birastasAtom,
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
  const [baristas] = useAtom(birastasAtom);
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
          <DialogTitle>Welcome Back!</DialogTitle>
          <DialogDescription asChild>
            <>
              Look what you got while you were away!
              <div className="pt-4">
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
