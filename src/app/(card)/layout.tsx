/**
 * @file app/card/layout.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Root layout for 3D business card page with full viewport styling.
 */

import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
