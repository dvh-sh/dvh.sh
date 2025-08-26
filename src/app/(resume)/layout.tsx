/**
 * @file app/(resume)/layout.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Sun, Aug 25 2025
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
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-black text-white font-mono antialiased">
        <div className="min-h-full">{children}</div>
      </body>
    </html>
  );
}
