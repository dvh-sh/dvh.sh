/**
 * @file src/providers/MotionProvider.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created 2026-05-04
 *
 * @description
 * Client wrapper around MotionConfig. Sets reducedMotion="user" so all
 * descendant motion/react components automatically respect the OS-level
 * prefers-reduced-motion setting. Mirrors the ThemeProvider pattern so the
 * server layout stays a server component.
 */

"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
