import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitLens | AI-Powered Nutrition Tracking for Personal Trainers",
  description:
    "See what your clients actually eat. AI-powered meal logging with photo, voice, and text. Built for personal trainers who scale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
