import dynamic from "next/dynamic";

// import { Game } from "./_components/Game";
const Game = dynamic(() => import("./_components/Game"), { ssr: false });
export default async function Home() {
  return (
    <main className="relative isolate h-full w-full text-slate-500">
      <Game />
    </main>
  );
}
