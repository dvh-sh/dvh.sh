import React, { useState, useRef, useCallback } from "react";
import { flavors } from "@catppuccin/palette";

import { ThemeContext } from "@container/ThemeContext";
import { Catppuccin } from "@types";

export const ThemeSwitcher = () => {
  const { theme, setTheme, accent, setAccent } = React.useContext(ThemeContext);
  const [showPalette, setShowPalette] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const themes: { name: Catppuccin["flavor"]; emoji: string }[] = [
    { name: "latte", emoji: "🌻" },
    { name: "frappe", emoji: "🪴" },
    { name: "macchiato", emoji: "🌺" },
    { name: "mocha", emoji: "🌿" },
  ];

  const accentColors = Object.keys(flavors.mocha.colors).filter(
    (color) =>
      flavors.mocha.colors[color as keyof typeof flavors.mocha.colors].accent,
  );

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowPalette(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setShowPalette(false);
    }, 300); 
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showPalette && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-surface0 rounded-lg shadow-lg flex flex-wrap gap-2 z-10 w-48">
          {accentColors.map((color) => (
            <button
              key={color}
              onClick={() => setAccent(color)}
              className={`w-6 h-6 rounded-full transition-transform duration-300 hover:scale-110 ${color === accent ? "ring-2 ring-text" : ""}`}
              style={{ backgroundColor: `var(--${color})` }}
              aria-label={`Set accent color to ${color}`}
            />
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`p-2 rounded-full bg-surface0 text-text hover:bg-overlay0 hover:text-overlay2 transition-all duration-300 hover:rotate-45 ${
              theme === t.name ? "ring-2 ring-accent" : ""
            }`}
            aria-label={`Switch to ${t.name} theme`}
          >
            {t.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// path: src/component/ThemeSwitcher.tsx
