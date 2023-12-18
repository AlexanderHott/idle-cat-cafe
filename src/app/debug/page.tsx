"use client";
import { Button } from "~/components/ui/button";

export default function DebugPage() {
  return (
    <>
      <Button
        variant={"destructive"}
        onClick={() => {
          localStorage.clear();
        }}
      >
        Reset State
      </Button>
    </>
  );
}
