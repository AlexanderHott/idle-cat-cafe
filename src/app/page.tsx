import { Game } from "./_components/Game";
export default async function Home() {
  return (
    <main className="w-full h-screen text-slate-500 isolate relative">
      <Game />
    </main>
  );
}
