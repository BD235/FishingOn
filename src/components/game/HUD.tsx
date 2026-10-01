"use client";

import Image from "next/image";
import { useGameStore } from "@/store/gameStore";
import { ASSETS } from "@/lib/game/assetConfig";

// Warna per rarity (untuk nanti)
export const RARITY_COLOR: Record<string, string> = {
  common: "#9ca3af",
  uncommon: "#4ade80",
  rare: "#60a5fa",
  epic: "#c084fc",
  legendary: "#fbbf24",
};

export default function HUD() {
  const player = useGameStore((s) => s.player);

  const xpPercent = Math.min(
    Math.round((player.xp / player.xpToNext) * 100),
    100
  );

  return (
    <div className="z-10 flex w-full items-center gap-2 bg-sky-900/80 px-3 py-2 backdrop-blur-sm">

      {/* Avatar + Level */}
      <div className="relative shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-sky-400 bg-sky-800 text-2xl">
          🧑
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-yellow-900">
          {player.level}
        </div>
      </div>

      {/* Username + XP Bar */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-semibold text-white">
          {player.username}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-sky-900">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <span className="shrink-0 text-[10px] text-sky-300">
            {player.xp}/{player.xpToNext}
          </span>
        </div>
      </div>

      {/* Koin — pakai gambar asli, fallback emoji kalau belum ada */}
      <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1">
        <div className="relative h-5 w-5">
          <Image
            src={ASSETS.ui.coinIcon}
            alt="koin"
            width={20}
            height={20}
            style={{ imageRendering: "pixelated" }}
            onError={(e) => {
              // Kalau gambar belum ada, sembunyikan dan tampilkan emoji
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          {/* Emoji fallback — tersembunyi kalau gambar ada */}
          <span className="hidden text-base">🪙</span>
        </div>
        <span className="text-sm font-bold text-yellow-300">
          {player.coins.toLocaleString("id-ID")}
        </span>
      </div>

    </div>
  );
}