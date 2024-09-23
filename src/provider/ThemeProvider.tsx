"use client";

import React, { useState, useEffect } from "react";
import { flavors } from "@catppuccin/palette";

import { ThemeContext } from "@container/ThemeContext";
import { Catppuccin } from "@types";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Catppuccin["flavor"]>("mocha");
  const [accent, setAccent] = useState<string>("pink");

  useEffect(() => {
    document.body.classList.remove("latte", "frappe", "macchiato", "mocha");
    document.body.classList.add(theme);

    Object.entries(flavors[theme as keyof typeof flavors].colors).forEach(
      ([colorName, colorValue]) => {
        document.documentElement.style.setProperty(
          `--${colorName}`,
          colorValue.hex,
        );
      },
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      `var(--${accent})`,
    );
  }, [theme, accent]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

// path: src/provider/ThemeProvider.tsx
