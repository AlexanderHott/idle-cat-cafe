"use client";
import { Sprite, Stage } from "@pixi/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Game() {
  // const [height, setHeight] = useState(window.innerHeight);
  // const width = useMemo(() => (height * 1692) / 615, [height]);
  //
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const onResize = useCallback(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // setHeight(window.innerHeight);
  }, []);
  //
  useEffect(() => {
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, [onResize]);

  return (
    <Stage
      className="game"
      options={{ background: 0xff3860 }}
      // height={height}
      // width={width}
    >
      <Sprite image="/assets/background.webp" 
        // height={height} 
        // width={width} 
      />
    </Stage>
  );
}
