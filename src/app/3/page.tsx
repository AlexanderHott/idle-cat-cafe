import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { Button } from "~/components/ui/button";

const Game = dynamic(() => import("./Game"), { ssr: false });
const vcrOsdMono = localFont({ src: "../../../public/VCR_OSD_MONO_1.001.ttf" });


export default function Page() {
  return (
    <div className={`relative ${vcrOsdMono.className}`}>
      <div className="absolute">
        <Game />
      </div>
      <div className="fixed right-0 top-0 p-4">
        <Button className="rounded-none">Hi</Button>
      </div>
    </div>
  );
}
