import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AudioProvider } from "@/context/AudioContext";
import SiteControls from "@/components/SiteControls";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const description =
  "zuhaib khan's portfolio: CS student at York University and full stack developer. projects, music and movie takes, and a 3D turntable you can click.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zuhaib Khan",
    template: "%s | Zuhaib Khan",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Zuhaib Khan",
    title: "Zuhaib Khan",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuhaib Khan",
    description,
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
      >
        <AudioProvider>
          <SiteControls />
          {children}
          <Analytics />
        </AudioProvider>
      </body>
    </html>
  );
}
