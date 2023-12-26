"use client";
import { Cat } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CATS, type CatT } from "./Game";
import { useAtom } from "jotai";
import { seenCatsAtom } from "~/lib/gameState";
import { ScrollArea } from "~/components/ui/scroll-area";

export function SeenCats() {
  const [seenCats] = useAtom(seenCatsAtom);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="mb-2">
          <Cat />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex grow-0 flex-col">
        <SheetHeader>
          <SheetTitle>Cats</SheetTitle>
          <SheetDescription>Meow :3</SheetDescription>
        </SheetHeader>

        <ScrollArea>
          <div className="flex flex-col gap-2">
            {CATS.map((c) => (
              <CatCard {...c} seen={seenCats.includes(c.id)} key={c.id} />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
function CatCard({ name, desc, assetPath, seen }: CatT & { seen: boolean }) {
  return (
    <Card className="bg-pink-100">
      <CardHeader className="">
        <CardTitle className="text-lg">{seen ? name : "???"}</CardTitle>
        <CardDescription>{seen ? desc : "???"}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-center">
        <Image
          src={seen ? assetPath + "default.png" : "/assets/unknown.png"}
          alt={seen ? name : "unknown"}
          width={128}
          height={128}
        />
      </CardContent>
    </Card>
  );
}
