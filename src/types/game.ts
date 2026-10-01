// ===== RARITY =====
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

// ===== IKAN =====
export interface FishType {
  id: string;
  name: string;
  scientificName: string;
  rarity: Rarity;
  spawnChance: number;   // 0–1, total semua harus = 1
  pricePerKg: number;    // koin per kg
  weightMin: number;     // kg
  weightMax: number;     // kg
  xpReward: number;
  description?: string;
}

export interface CaughtFish {
  id: string;            // uuid unik per tangkapan
  fishTypeId: string;
  name: string;
  rarity: Rarity;
  weight: number;        // kg, hasil random saat tangkap
  price: number;         // total harga = weight × pricePerKg
  xp: number;
  caughtAt: number;      // timestamp
}

// ===== ROD =====
export type RodType = "bamboo" | "fiber" | "carbon" | "titanium";

export interface Rod {
  id: RodType;
  name: string;
  emoji: string;
  price: number;         // 0 = gratis (bamboo)
  barSize: number;       // 0–1, ukuran bar pemain di mini-game
  fishSpeedMult: number; // multiplier kecepatan ikan (< 1 = lebih lambat)
  rareBonusChance: number; // tambahan % chance ikan rare
}

// ===== PLAYER =====
export interface PlayerState {
  username: string;
  level: number;
  xp: number;
  xpToNext: number;
  coins: number;
  currentRod: RodType;
  ownedRods: RodType[];
  inventory: CaughtFish[];
  maxInventory: number;
  totalFishSold: number;  // untuk leaderboard
}

// ===== GAME STATE =====
export type FishingPhase =
  | "idle"        // belum cast
  | "casting"     // animasi cast
  | "waiting"     // tunggu pelampung (3–10 detik)
  | "biting"      // pelampung goyang
  | "minigame"    // tension bar aktif
  | "success"     // ikan tertangkap
  | "failed";     // ikan kabur