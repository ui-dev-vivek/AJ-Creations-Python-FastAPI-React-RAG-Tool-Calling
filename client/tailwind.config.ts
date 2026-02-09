import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";
import { mavaTheme } from "./src/theme/mava-theme";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /**
         * MAVA Color Palette - Primary Colors
         * ═══════════════════════════════════════════════════════════════════════════════
         */
        primary: {
          50: "#f0f4f9",
          100: "#dae3f0",
          200: "#c3d2e7",
          300: "#adc1de",
          400: "#96b0d5",
          500: "#00296b", // Main primary
          600: "#003f88", // Primary hover
          700: "#00509d", // Primary active
          800: "#002050",
          900: "#001535",
          DEFAULT: "#00296b",
        },
        /**
         * MAVA Color Palette - Secondary Colors
         * ═══════════════════════════════════════════════════════════════════════════════
         */
        secondary: {
          50: "#fffbf0",
          100: "#fff5dd",
          200: "#ffefc9",
          300: "#ffe9b5",
          400: "#ffe3a1",
          500: "#ffd500", // Main secondary
          600: "#fdc500", // Secondary hover
          700: "#e6b200", // Secondary active
          800: "#cc9e00",
          900: "#b38a00",
          DEFAULT: "#ffd500",
        },
        /**
         * Text Colors
         */
        "text-dark": "#1a1a1a",
        "text-light": "#666666",
      },
      backgroundColor: {
        "primary-light": "#f0f4f9",
        "secondary-light": "#fffbf0",
      },
      textColor: {
        "primary-dark": "#00296b",
        "secondary-dark": "#ffd500",
      },
      borderColor: {
        primary: "#00296b",
        secondary: "#ffd500",
      },
    },
  },
  plugins: [heroui()],
  darkMode: "class",
};

export default config;
