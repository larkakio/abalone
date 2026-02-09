import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { Web3Provider } from "@/context/Web3Context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const FC_EMBED = {
  version: '1',
  imageUrl: `${APP_URL}/hero-image.png`,
  button: {
    title: 'Play Abalone',
    action: {
      type: 'launch_frame',
      name: 'Abalone',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0e1a',
    },
  },
};

export const metadata: Metadata = {
  title: "Abalone - Strategy Board Game",
  description: "Push your opponent's marbles off the hexagonal board in this award-winning abstract strategy game. Play on Base!",
  openGraph: {
    title: 'Abalone - Strategy Board Game',
    description: 'Classic strategy game reimagined for mobile with smooth swipe controls',
    images: [{
      url: `${APP_URL}/hero-image.png`,
      width: 1200,
      height: 630,
    }],
  },
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#0a0e1a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
    'base:app_id': '69899e5173cda529e5cd6867',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, overflow: 'hidden' }}
      >
        <Web3Provider>
          <GameProvider>
            {children}
          </GameProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
