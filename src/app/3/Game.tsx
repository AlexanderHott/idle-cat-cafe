"use client";
import { Sprite, Stage } from "@pixi/react";

export default function Game() {
  console.log(
    "height:",
    window.innerHeight,
    "width: ",
    (window.innerHeight * 1692) / 615,
  );
  return (
    <Stage
      height={window.innerHeight}
      width={(window.innerHeight * 1692) / 615}
      style={{
        height: window.innerHeight,
        width: (window.innerHeight * 1692) / 615,
      }}
      className="h-screen"
    >
      <Sprite
        image="/assets/background.webp"
        height={window.innerHeight}
        width={(window.innerHeight * 1692) / 615}
      />
    </Stage>
  );
}
