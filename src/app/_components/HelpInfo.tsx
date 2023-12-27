"use client";
import { ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
export function HelpInfo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="mb-2">
          <HelpCircle />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex grow-0 flex-col">
        <SheetHeader className="flex flex-col">
          <SheetTitle>Help</SheetTitle>
          <SheetDescription>
            The goal of this game is not to earn money, it's to have all the
            cats. Money is just a tool to achieve that. You gain money by hiring
            more Baristas, buying more menu items, and more importantly,
            attracting more cats. More cats show up when you have more toys.
          </SheetDescription>
        </SheetHeader>
        <div>
          <Link
            href="https://github.com/AlexanderHott/idle-cat-cafe/discussions"
            target="_blank"
          >
            <Button className="items-center gap-2">
              Feedback
              <ExternalLink className="h-4 w-4"/>
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
