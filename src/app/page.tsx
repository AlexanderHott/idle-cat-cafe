import dynamic from 'next/dynamic';

// import { Game } from "./_components/Game";
const Game = dynamic(() => import('./_components/Game'), { ssr: false })
export default async function Home() {

  return (
    <main className="w-full h-full text-slate-500 isolate relative">
      <Game />
    </main>
  );
}
