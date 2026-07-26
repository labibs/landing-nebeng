import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const comfortaaHead = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-head",
});

const comfortaaBody = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "numpak — Manfaatkan Perjalanan Searah",
  description:
    "Platform peer-to-peer untuk bawain barang, beliin sesuatu, cari boncengan, dan kebutuhan lokal lain melalui orang yang memang sedang searah.",
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
      <body className={comfortaaHead.variable + " " + comfortaaBody.variable}>
        {children}
      </body>
    </html>
  );
}
