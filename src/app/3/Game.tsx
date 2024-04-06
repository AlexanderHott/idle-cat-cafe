"use client";
import { Sprite, Stage } from "@pixi/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Game() {
  const [height, setHeight] = useState(window.innerHeight);
  const width = useMemo(() => (height * 1692) / 615, [height]);

  const onResize = useCallback(() => {
    setHeight(window.innerHeight);
  }, [setHeight]);

  useEffect(() => {
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, [onResize]);

  return (
    <Stage options={{ background: 0xff3860 }} height={height} width={width}>
      <Sprite image="/assets/background.webp" height={height} width={width} />
    </Stage>
  );
}
