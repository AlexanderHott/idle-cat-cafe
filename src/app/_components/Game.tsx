"use client";
import { useLocalStorage } from "@uidotdev/usehooks";

import { useEffect, useRef, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export function Game() {
  const [gameState, setGameState] = useLocalStorage("gameState", {});
  const { width, height } = useWindowDimensions();
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('width', ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current, loaded, ref.current?.offsetWidth]);

  return (
    <>
      <img ref={ref} src="/space-h.jpeg" loading="eager" className="-z-10 overflow-x-scroll h-screen max-w-none" onLoad={() => setLoaded(true)}/>
      <div className="absolute w-[10vw] h-[10vw] bg-red-500 top-0 left-0" >a</div>
    </>
  );
}
