"use client";

import { useState } from "react";
import Image from "next/image";

interface GameImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback?: string;      // emoji fallback kalau gambar belum ada
  className?: string;
  pixelated?: boolean;    // true = render pixel art tanpa blur
}

export default function GameImage({
  src,
  alt,
  width,
  height,
  fallback = "🖼️",
  className = "",
  pixelated = true,
}: GameImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
        title={alt}
      >
        <span style={{ fontSize: Math.min(width, height) * 0.7 }}>
          {fallback}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      style={{
        imageRendering: pixelated ? "pixelated" : "auto",
      }}
    />
  );
}