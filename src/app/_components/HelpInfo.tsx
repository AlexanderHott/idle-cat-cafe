"use client";
import { Bug, ExternalLink, Github, HelpCircle } from "lucide-react";
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
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="flex flex-col">
          <SheetTitle>Help</SheetTitle>
          <SheetDescription className="text-lg">
            The goal of this game is not to earn money, it's to have all the
            cats :3. Money is just a tool to achieve that. You gain money by hiring
            more Baristas, buying more menu items, and most importantly,
            attracting more cats. More cats show up when you have more toys.
          </SheetDescription>
        </SheetHeader>
        <div className="flex gap-2">
          <Link
            href="https://github.com/AlexanderHott/idle-cat-cafe/discussions"
            target="_blank"
          >
            <Button className="items-center gap-2">
              Feedback
              <ExternalLink className="h-4 w-4"/>
            </Button>
          </Link>
          <Link
            href="https://github.com/AlexanderHott/idle-cat-cafe/issues/new/choose"
            target="_blank"
          >
            <Button className="items-center gap-2">
              Report a bug
              <Bug className="h-4 w-4"/>
            </Button>
          </Link>
          <Link
            href="https://github.com/AlexanderHott/idle-cat-cafe/"
            target="_blank"
          >
            <Button variant={"secondary"} size="icon" className="items-center gap-2">
              <Github className="h-4 w-4"/>
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
