/**
 * @file app/(resume)/layout.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Standalone layout for resume page.
 */

import type { Metadata } from "next";
import React from "react";

import "../globals.css";

export const metadata: Metadata = {
  title: "David Heffler - Resume",
  description: "Software Engineer | Mathematics & CS Student @ MSJC",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://dvh.sh/resume" },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="h-full bg-black text-white font-mono antialiased">
        <div className="min-h-full">{children}</div>
      </body>
    </html>
  );
}
