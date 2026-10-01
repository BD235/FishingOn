"use client";

import GameContainer from "@/components/game/GameContainer";
import HUD from "@/components/game/HUD";
import GameScene from "@/components/game/GameScene";
import BottomBar from "@/components/game/BottomBar";

export default function HomePage() {
  return (
    <GameContainer>
      <HUD />
      <GameScene />
      <BottomBar />
    </GameContainer>
  );
}