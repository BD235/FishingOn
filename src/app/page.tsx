export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center bg-sky-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold">🎣 FishingOn</h1>

        <p className="mt-4 text-zinc-300">
          Casual Fishing Web Game
        </p>

        <button className="mt-8 rounded-xl bg-sky-500 px-6 py-3 text-lg font-semibold hover:bg-sky-400">
          Start Fishing
        </button>
      </div>
    </main>
  );
}