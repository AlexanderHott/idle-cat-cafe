"use client";
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

export function WelcomeBackModal(
  { defaultOpen, diff }: { defaultOpen?: boolean; diff: number },
) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome Back!</DialogTitle>
          <DialogDescription>
            Look what you got while you were away! ${diff * 100}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
