import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FishingOn",
  description: "Casual Fishing Web Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}