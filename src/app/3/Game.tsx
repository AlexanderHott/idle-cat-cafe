"use client";
import { Sprite, Stage} from "@pixi/react";
import { SCALE_MODES, Texture } from "pixi.js";
import { BG_HEIGHT, BG_WIDTH } from "~/lib/constants";

export default function Game() {
  const HEIGHT = window.innerHeight;
  const WIDTH = (window.innerHeight * BG_WIDTH) / BG_HEIGHT;

  console.log("height:", HEIGHT, "width: ", WIDTH);
  return (
    <Stage
      height={HEIGHT}
      width={WIDTH}
      className="rendering-pixelated h-screen"
    >
      <Sprite image="/assets/background.png" height={HEIGHT} width={WIDTH} />
      <Sprite
        texture={Texture.from("/assets2/black-tea.png", {
          scaleMode: SCALE_MODES.NEAREST,
        })}
        width={(12 * WIDTH) / 180}
        height={(9 * HEIGHT) / 80}
        x={0.1 * WIDTH}
        y={0.55 * HEIGHT}
      />
    </Stage>
  );
}
