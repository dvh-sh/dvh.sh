import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./src/container/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
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
