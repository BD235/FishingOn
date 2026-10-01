"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { ASSETS } from "@/lib/game/assetConfig";

// ============================================================
// KONFIGURASI — ubah di sini kalau perlu fine-tune
// ============================================================

// Posisi karakter (% dari ukuran container)
const CHAR_LEFT = "8%";    // geser kiri/kanan
const CHAR_TOP  = "32%";   // geser atas/bawah — maju ke ujung jembatan

// Titik ujung joran (asal benang) — relatif dari pojok kiri atas karakter
// Sesuaikan dengan posisi tangan karakter di sprite
const ROD_TIP_OFFSET = { x: 55, y: 30 }; // px dari pojok kiri atas karakter

// Posisi pelampung di air (% dari container)
const FLOAT_LEFT = "55%";
const FLOAT_TOP  = "58%";

// Sprite config
const SPRITE_CONFIG = {
  idle: {
    src: ASSETS.character.idle,
    frameWidth: 48,
    frameHeight: 96,
    totalFrames: 1,   // ← POIN 1: idle cukup 1 frame diam
    fps: 1,
  },
  fishing: {
    src: ASSETS.character.fishing,
    frameWidth: 32,
    frameHeight: 96,
    totalFrames: 3,
    fps: 4,
  },
} as const;

const DISPLAY_SCALE = 1;

// ============================================================
// SpriteCanvas — render sprite sheet dengan frame cutting
// ============================================================
function SpriteCanvas({
  src, frameWidth, frameHeight, totalFrames, fps, scale = 1,
}: {
  src: string; frameWidth: number; frameHeight: number;
  totalFrames: number; fps: number; scale?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef(0);
  const imgRef    = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded]   = useState(false);
  const [errored, setErrored] = useState(false);

  const displayW = frameWidth  * scale;
  const displayH = frameHeight * scale;

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, displayW, displayH);
    ctx.drawImage(
      img,
      frameIndex * frameWidth, 0,
      frameWidth, frameHeight,
      0, 0,
      displayW, displayH
    );
  }, [frameWidth, frameHeight, displayW, displayH]);

  useEffect(() => {
    const img   = new window.Image();
    img.src     = src;
    img.onload  = () => { imgRef.current = img; setLoaded(true); };
    img.onerror = () => setErrored(true);
    return () => { img.onload = null; img.onerror = null; };
  }, [src]);

  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  useEffect(() => {
    if (!loaded || totalFrames <= 1) return;
    const id = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % totalFrames;
      drawFrame(frameRef.current);
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [loaded, totalFrames, fps, drawFrame]);

  if (errored) {
    return (
      <div style={{ width: displayW, height: displayH }}
        className="flex items-end justify-center text-4xl">🧑</div>
    );
  }

  return (
    <canvas ref={canvasRef} width={displayW} height={displayH}
      style={{ imageRendering: "pixelated" }} />
  );
}

// ============================================================
// FishingLine — benang pancing dari joran ke pelampung
// ============================================================
function FishingLine({
  charLeft, charTop, floatLeft, floatTop, containerRef,
}: {
  charLeft: string; charTop: string;
  floatLeft: string; floatTop: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hitung koordinat absolut ujung joran
    const charX = (parseFloat(charLeft) / 100) * W + ROD_TIP_OFFSET.x;
    const charY = (parseFloat(charTop)  / 100) * H + ROD_TIP_OFFSET.y;

    // Hitung koordinat pelampung
    const floatX = (parseFloat(floatLeft) / 100) * W;
    const floatY = (parseFloat(floatTop)  / 100) * H;

    // Gambar benang sebagai kurva Bezier
    ctx.beginPath();
    ctx.moveTo(charX, charY);
    ctx.quadraticCurveTo(
      (charX + floatX) / 2, charY + 30,  // titik kontrol (lengkung ke bawah)
      floatX, floatY
    );
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }, [charLeft, charTop, floatLeft, floatTop, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 11,
        pointerEvents: "none",
      }}
    />
  );
}

// ============================================================
// FloatSprite — pelampung
// ============================================================
function FloatSprite({ biting }: { biting: boolean }) {
  const [err, setErr] = useState(false);
  const src = biting ? ASSETS.float.bite : ASSETS.float.idle;
  if (err) return <div className="text-xl">{biting ? "🔴" : "🎈"}</div>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="pelampung" onError={() => setErr(true)}
      style={{ imageRendering: "pixelated", width: 24, height: 40 }} />
  );
}

// ============================================================
// GameScene utama
// ============================================================
export default function GameScene() {
  const fishingPhase = useGameStore((s) => s.fishingPhase);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgError, setBgError] = useState(false);

  const isIdle    = ["idle", "success", "failed"].includes(fishingPhase);
  const isCasting = fishingPhase === "casting";
  const isWaiting = fishingPhase === "waiting";
  const isBiting  = fishingPhase === "biting";
  const isMinigame = fishingPhase === "minigame";

  // Tampilkan benang & pelampung saat sedang mancing
  const showLine  = isCasting || isWaiting || isBiting || isMinigame;
  const showFloat = isWaiting || isBiting || isMinigame;

  const sprite = isIdle ? SPRITE_CONFIG.idle : SPRITE_CONFIG.fishing;

  return (
    <div ref={containerRef} className="relative flex-1 overflow-hidden bg-sky-400">

      {/* Background */}
      {!bgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ASSETS.bg.scene}
          alt="scene"
          onError={() => setBgError(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "fill",
            imageRendering: "pixelated",
          }}
        />
      ) : (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-300" />
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-amber-700" />
          <div className="absolute bottom-0 left-0 right-0 bg-blue-600" style={{ top: "55%" }} />
        </div>
      )}

      {/* Benang pancing — Canvas overlay */}
      {showLine && (
        <FishingLine
          charLeft={CHAR_LEFT}
          charTop={CHAR_TOP}
          floatLeft={FLOAT_LEFT}
          floatTop={FLOAT_TOP}
          containerRef={containerRef}
        />
      )}

      {/* Karakter */}
      <div
        style={{
          position: "absolute",
          top: CHAR_TOP,
          left: CHAR_LEFT,
          zIndex: 10,
        }}
      >
        <SpriteCanvas
          src={sprite.src}
          frameWidth={sprite.frameWidth}
          frameHeight={sprite.frameHeight}
          totalFrames={sprite.totalFrames}
          fps={sprite.fps}
          scale={DISPLAY_SCALE}
        />
      </div>

      {/* Pelampung */}
      {showFloat && (
        <div
          style={{
            position: "absolute",
            top: FLOAT_TOP,
            left: FLOAT_LEFT,
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
          className={isBiting ? "animate-bounce" : ""}
        >
          <FloatSprite biting={isBiting} />
        </div>
      )}

      {/* Tanda TARIK saat biting */}
      {isBiting && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: FLOAT_LEFT,
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
          className="animate-bounce"
        >
          <div className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
            ❗ TARIK!
          </div>
        </div>
      )}

    </div>
  );
}