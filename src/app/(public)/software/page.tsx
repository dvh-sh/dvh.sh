/**
 * @file app/software/page.tsx
 * @author David (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Server component shell for /software. Exports per-route metadata and renders
 * the client-side SoftwareClient (which handles fetch + theme animation).
 */

import type { Metadata } from "next";

import SoftwareClient from "@/containers/software/SoftwareClient";

export const metadata: Metadata = {
  title: "Software — David Heffler",
  description:
    "Apps, dotfiles, and developer tools David uses and ships — categorized with install commands.",
  openGraph: {
    title: "Software — David Heffler",
    description:
      "Apps, dotfiles, and developer tools David uses and ships — categorized with install commands.",
    url: "https://www.dvh.sh/software",
    type: "website",
  },
};

const SoftwarePage = () => <SoftwareClient />;

export default SoftwarePage;
