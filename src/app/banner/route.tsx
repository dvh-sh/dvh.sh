/**
 * @file src/app/banner/route.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @description
 * Social banner image — 1500x500 (Twitter/X header).
 * ?size=og for 1200x630 (OpenGraph), ?size=square for 1080x1080 (Instagram).
 * Uses Catppuccin Mocha palette to match the site.
 */

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// Catppuccin Mocha
const MOCHA = {
  base: "#1e1e2e",
  mantle: "#181825",
  surface0: "#313244",
  text: "#cdd6f4",
  subtext0: "#a6adc8",
  overlay0: "#6c7086",
  pink: "#f5c2e7",
  lavender: "#b4befe",
};

export const GET = (request: NextRequest) => {
  const sizeParam = request.nextUrl.searchParams.get("size");
  const width = sizeParam === "og" ? 1200 : sizeParam === "square" ? 1080 : 1500;
  const height = sizeParam === "og" ? 630 : sizeParam === "square" ? 1080 : 500;

  const isSquare = sizeParam === "square";
  const nameSize = isSquare ? "120px" : sizeParam === "og" ? "88px" : "72px";
  const tagSize = isSquare ? "32px" : sizeParam === "og" ? "28px" : "22px";
  const urlSize = isSquare ? "24px" : "18px";
  const padding = isSquare ? "100px" : "80px";

  return new ImageResponse(
    (
      <div
        style={{
          background: MOCHA.base,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          textAlign: "right" as const,
          padding,
          border: `4px solid ${MOCHA.pink}`,
          backgroundImage: `linear-gradient(${MOCHA.surface0}40 1px, transparent 1px), linear-gradient(90deg, ${MOCHA.surface0}40 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            fontSize: nameSize,
            fontWeight: 800,
            color: MOCHA.text,
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-2px",
          }}
        >
          David Heffler
        </div>
        <div
          style={{
            fontSize: tagSize,
            color: MOCHA.pink,
            fontFamily: "monospace",
            lineHeight: 1.4,
            marginTop: "16px",
          }}
        >
          founder // developer // builder
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "24px",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              fontSize: urlSize,
              color: MOCHA.lavender,
              fontFamily: "monospace",
              letterSpacing: "3px",
            }}
          >
            dvh.sh
          </div>
          <div
            style={{
              width: "2px",
              height: "18px",
              background: MOCHA.overlay0,
            }}
          />
          <div
            style={{
              fontSize: urlSize,
              color: MOCHA.subtext0,
              fontFamily: "monospace",
              letterSpacing: "3px",
            }}
          >
            @dvhsh
          </div>
        </div>
      </div>
    ),
    { width, height },
  );
};
