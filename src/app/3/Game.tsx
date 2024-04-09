"use client";
import { Sprite, Stage } from "@pixi/react";

export default function Game() {
  return (
    <Stage
      options={{ background: 0xff3860 }}
      height={window.innerHeight}
      width={(window.innerHeight * 1692) / 615}
    >
      <Sprite
        image="/assets/background.webp"
        height={window.innerHeight}
        width={(window.innerHeight * 1692) / 615}

        // height={615} width={1692}
      />
    </Stage>
  );
}
