import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

// 🎨 TIPOGRAFIE HIBRIDĂ - MODERN PREMIUM
// Playfair Display - Serif elegant doar pentru hero headlines (H1, H2)
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Plus Jakarta Sans - Sans-serif modern pentru subtitluri și UI (H3-H6, meniuri, butoane)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

// Inter - Sans-serif curat pentru body text
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
        className={`${playfair.variable} ${plusJakarta.variable} ${inter.variable} antialiased`}
      >
        <Preloader />
        <SmoothScroll />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
