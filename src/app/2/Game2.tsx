"use client";

import { Sprite, Stage } from "@pixi/react";
import { Application } from "pixi.js";

const app = new Application({ resizeTo: window });

export default function Game2() {
  console.log(window.innerWidth, window.innerHeight);
  return (
    <Stage
      options={{
        resizeTo: window,
      }}
      height={window.innerHeight}
      width={window.innerWidth}
    >
      <Sprite height={window.innerHeight} width={window.innerHeight * 1692 / 615} image="/assets/background.webp"  />
    </Stage>
  );
}
