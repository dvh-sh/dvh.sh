import React from "react";
import { ThemeContext } from "@container/ThemeContext";
import { Catppuccin } from "@types";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const themes: { name: Catppuccin["flavor"]; emoji: string }[] = [
    { name: "latte", emoji: "🌻" },
    { name: "frappe", emoji: "🪴" },
    { name: "macchiato", emoji: "🌺" },
    { name: "mocha", emoji: "🌿" },
  ];

  return (
    <div className="flex items-center space-x-4">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          className={`p-2 rounded-full bg-surface0 text-text hover:bg-overlay0 hover:text-overlay2 ${
            theme === t.name ? "ring-2 ring-accent" : ""
          }`}
          aria-label={`Switch to ${t.name} theme`}
        >
          {t.emoji}
        </button>
      ))}
    </div>
  );
};

// path: src/component/ThemeSwitcher.tsx
