import dynamic from "next/dynamic";
import localFont from "next/font/local";

const vcrOsdMono = localFont({ src: "../../../public/VCR_OSD_MONO_1.001.ttf" });

const Game2 = dynamic(() => import("./Game2"), { ssr: false });

export default function Two() {
  return (
    <div className={`${vcrOsdMono.className}`}>
      <Game2 />
    </div>
  );
}
