import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@provider/ThemeProvider";

import { Sidebar } from "@container/nav/Sidebar";
import { Footer } from "@container/nav/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "David | Full-Stack Developer Portfolio",
  description:
    "Explore David’s personal portfolio showcasing skills and experience in full-stack development, with expertise in various modern technologies.",
  keywords:
    "David, Full-Stack Developer, Software Engineer, Web Development, Backend, Frontend, CSIS Student",
  openGraph: {
    title: "David | Full-Stack Developer Portfolio",
    description:
      "Explore David’s portfolio, highlighting his expertise in full-stack development across a range of modern technologies.",
    url: "https://dvh.sh",
    siteName: "David Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://dvh.sh/icons/icon.png",
        width: 1200,
        height: 630,
        alt: "David Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HaruHoldings",
    title: "David | Full-Stack Developer Portfolio",
    description:
      "Explore David’s portfolio, highlighting his expertise in full-stack development across a range of modern technologies.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="canonical" href="https://dvh.sh" />
        <meta name="theme-color" content="#1e1e2e" />
        <link
          rel="preload"
          href="/fonts/open-sans-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <div className="flex flex-grow relative w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col w-full">
              <main className="flex-grow w-full">{children}</main>
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

// path: src/app/layout.tsx
