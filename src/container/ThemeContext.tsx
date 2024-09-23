"use client";

import React from "react";
import { Catppuccin } from "@types";

type ThemeContextType = {
  theme: Catppuccin["flavor"];
  setTheme: (theme: Catppuccin["flavor"]) => void;
  accent: string;
  setAccent: (accent: string) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "mocha",
  setTheme: (theme) => console.warn("no theme provider"),
  accent: "pink",
  setAccent: (accent) => console.warn("no theme provider"),
});

// path: src/container/ThemeContext.tsx
