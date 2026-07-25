import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-head",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Numpak — Titip Kirim Searah Tanpa Armada Baru",
  description:
    "Platform peer-to-peer untuk titip kirim barang melalui orang yang memang sedang melewati rute yang sama, tanpa batas profesi, jarak, atau moda.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={sora.variable + " " + dmSans.variable}>{children}</body>
    </html>
  );
}
