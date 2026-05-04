/**
 * @file src/app/layout.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Root layout for the entire application.
 * Sets up HTML structure, metadata, theme provider, and navigation components.
 * Fetches the latest commit hash server-side (cached 1h) so the footer
 * doesn't hit the GitHub API per visitor.
 */

import React, { JSX } from "react";
import type { Metadata } from "next";

import "../globals.css";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { Footer } from "@/containers/nav/Footer";
import { Sidebar } from "@/containers/nav/Sidebar";

/**
 * @function getGitHash
 * @description Fetches the short SHA of the latest commit on main, cached for 1h.
 * Returns null on failure so the footer just hides the hash.
 */
const getGitHash = async (): Promise<string | null> => {
  try {
    const res = await fetch(
      "https://api.github.com/repos/dvh-sh/dvh.sh/commits/main",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { sha?: string };
    return data.sha?.substring(0, 7) ?? null;
  } catch {
    return null;
  }
};

/**
 * @var metadata
 * @description The base metadata for the application, including title, description,
 * keywords, and OpenGraph/Twitter card information.
 */
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

/**
 * @component RootLayout
 * @description The root layout component that wraps all pages.
 * @param {{ children: React.ReactNode }} { children } - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root HTML structure of the application.
 */
const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  const gitHash = await getGitHash();

  return (
    <html lang="en">
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-accent focus:text-ctp-base focus:px-4 focus:py-2 focus:font-black focus:uppercase focus:tracking-wider focus:shadow-brutal"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <MotionProvider>
            <div className="flex flex-grow relative w-full">
              <Sidebar />
              <div className="flex-1 flex flex-col w-full">
                <main id="main" className="flex-grow w-full">
                  {children}
                </main>
              </div>
            </div>
            <Footer gitHash={gitHash} />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
