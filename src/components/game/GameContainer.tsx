"use client";

interface GameContainerProps {
  children: React.ReactNode;
}

export default function GameContainer({ children }: GameContainerProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-900">
      {/* 
        Container utama game — fixed width seperti mobile (390px)
        Di desktop tetap 390px, di mobile full width
      */}
      <div
        className="relative flex h-full w-full flex-col overflow-hidden bg-sky-950"
        style={{ maxWidth: "390px" }}
      >
        {children}
      </div>
    </div>
  );
}