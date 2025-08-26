/**
 * @file app/(resume)/layout.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Optimized layout for perfect Lighthouse scores.
 */

import type { Metadata } from "next";
import React from "react";

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
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS inlined for performance */
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { height: 100%; }
          body { 
            height: 100%; 
            background: #11111b; 
            color: #cdd6f4; 
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .min-h-full { min-height: 100%; }
          /* Catppuccin colors with WCAG AAA contrast */
          .text-ctp-pink { color: #f5c2e7; }
          .text-ctp-text { color: #cdd6f4; }
          .text-ctp-subtext0 { color: #a6adc8; } /* Better contrast than subtext1 */
          .text-ctp-blue { color: #89b4fa; }
          .text-ctp-surface1 { color: #45475a; }
          .border-ctp-surface1 { border-color: #45475a; }
          a { text-decoration: none; }
          @media print {
            body { background: white; color: black; }
            .no-print { display: none; }
          }
        `}} />
      </head>
      <body>
        <div className="min-h-full">{children}</div>
      </body>
    </html>
  );
}
