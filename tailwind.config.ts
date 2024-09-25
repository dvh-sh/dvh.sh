import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/container/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        accent: "var(--accent-color)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@catppuccin/tailwindcss")({
      defaultFlavor: "Mocha",
    }),
    require("@tailwindcss/typography"),
  ],
  safelist: [
    "text-yellow",
    "text-blue",
    "text-mauve",
    "text-green",
    "text-red",
    "text-peach",
    "text-gray",
    "text-pink",
    "text-gray",
  ],
};

export default config;
