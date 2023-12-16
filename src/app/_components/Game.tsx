"use client";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { set } from "zod";

export function Game() {
  // const [gameState, setGameState] = useLocalStorage("gameState", {});
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);

  // Update width on window resize
  useEffect(() => {
    const updateImageHeight = () => {
      const newWidth = ref.current ? ref.current.offsetWidth : 0;
      setWidth(newWidth);
      console.log("updating width");
    };

    window.addEventListener("resize", updateImageHeight);

    return () => window.removeEventListener("resize", updateImageHeight);
  }, []);
  // Update width on image load
  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current, loaded]);

  console.log("give width", width);

  const HEIGHT = 400;
  const dWidth = Math.floor(width * 0.03);
  const dHeight = Math.floor(width / HEIGHT * 10);
  const sWidth = Math.floor(width * 0.202);
  const sHeight = Math.floor(width / HEIGHT * 10);

  return (
    <>
      <img
        ref={ref}
        src="/space-h.jpeg"
        loading="eager"
        className="-z-10 overflow-x-scroll h-full max-w-none"
        onLoad={() => setLoaded(true)}
      />
      <div
        className={`absolute bg-black left-0 z-10 text-clamp`}
        style={{ top: `${dHeight}px`, left: `${dWidth}px`, width: width*0.02, height: width*0.01 }}
      >
        {width}
      </div>
      <div
        className={`absolute bg-orange-500 left-0 z-10 text-clamp`}
        style={{ top: `${sHeight}px`, left: `${sWidth}px`, width: width*0.014, height: width*0.01 }}
      >
        {width}
      </div>
    </>
  );
}
