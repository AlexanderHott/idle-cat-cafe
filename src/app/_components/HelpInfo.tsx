"use client";
import { HelpCircle } from "lucide-react";
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
        <SheetHeader>
          <SheetTitle>Help</SheetTitle>
          <SheetDescription>Coming soon...</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
