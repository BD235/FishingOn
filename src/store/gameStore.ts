import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type { PlayerState, CaughtFish, RodType, FishingPhase } from "@/types/game";
import { XP_TABLE } from "@/lib/game/xpTable";

interface GameStore {
  // Player
  player: PlayerState;

  // Fishing state
  fishingPhase: FishingPhase;
  currentFish: CaughtFish | null;

  // Actions
  setFishingPhase: (phase: FishingPhase) => void;
  setCurrentFish: (fish: CaughtFish | null) => void;
  addFishToInventory: (fish: CaughtFish) => void;
  sellAllFish: () => void;
  buyRod: (rodId: RodType, price: number) => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
}

const INITIAL_PLAYER: PlayerState = {
  username: "Pemancing",
  level: 1,
  xp: 0,
  xpToNext: XP_TABLE[1],
  coins: 0,
  currentRod: "bamboo",
  ownedRods: ["bamboo"],
  inventory: [],
  maxInventory: 20,
  totalFishSold: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    immer((set) => ({
      player: INITIAL_PLAYER,
      fishingPhase: "idle",
      currentFish: null,

      setFishingPhase: (phase) =>
        set((state) => { state.fishingPhase = phase; }),

      setCurrentFish: (fish) =>
        set((state) => { state.currentFish = fish; }),

      addFishToInventory: (fish) =>
        set((state) => {
          if (state.player.inventory.length < state.player.maxInventory) {
            state.player.inventory.push(fish);
          }
        }),

      sellAllFish: () =>
        set((state) => {
          const total = state.player.inventory.reduce((sum, f) => sum + f.price, 0);
          state.player.coins += total;
          state.player.totalFishSold += total;
          state.player.inventory = [];
        }),

      buyRod: (rodId, price) =>
        set((state) => {
          if (state.player.coins >= price && !state.player.ownedRods.includes(rodId)) {
            state.player.coins -= price;
            state.player.ownedRods.push(rodId);
            state.player.currentRod = rodId;
          }
        }),

      addXP: (amount) =>
        set((state) => {
          state.player.xp += amount;
          // Level up loop
          while (state.player.xp >= state.player.xpToNext) {
            state.player.xp -= state.player.xpToNext;
            state.player.level += 1;
            state.player.xpToNext = XP_TABLE[state.player.level] ?? 9999;
            // Unlock inventory slot di level 10 dan 20
            if (state.player.level === 10) state.player.maxInventory += 5;
            if (state.player.level === 20) state.player.maxInventory += 5;
          }
        }),

      addCoins: (amount) =>
        set((state) => { state.player.coins += amount; }),
    })),
    { name: "fishingon-save" } // auto-save ke localStorage
  )
);