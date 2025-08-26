/**
 * @file app/(resume)/layout.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Standalone layout for resume page with optimized performance.
 */

import type { Metadata } from "next";
import React from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "David Heffler - Resume",
  description: "Software Engineer | Mathematics & CS Student @ MSJC",
  viewport: "width=device-width, initial-scale=1",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-ctp-base text-ctp-text font-mono antialiased">
        <div className="min-h-full">{children}</div>
      </body>
    </html>
  );
}
