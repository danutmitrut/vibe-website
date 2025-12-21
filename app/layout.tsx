import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

// 🎨 TIPOGRAFIE MODERNĂ
// Playfair Display - Serif elegant pentru titluri
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

// Inter - Sans-serif curat pentru text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

/**
 * 🔍 SEO METADATA
 * Pentru cursanți: Metadata = informații pentru Google și social media
 */
export const metadata: Metadata = {
  title: "Vibe Coffee - Cafea de Specialitate în București",
  description: "Descoperă aromele autentice ale cafelei de specialitate într-un ambient modern și prietenos. Boabe proaspăt prăjite, bariști experimentați, WiFi gratuit.",
  keywords: ["cafenea bucuresti", "cafea specialitate", "coffee shop", "vibe coffee"],
  authors: [{ name: "Vibe Coffee Team" }],
  openGraph: {
    title: "Vibe Coffee - Cafea de Specialitate",
    description: "Locul perfect pentru cafeaua ta zilnică",
    type: "website",
    locale: "ro_RO",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <Preloader />
        <SmoothScroll />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
