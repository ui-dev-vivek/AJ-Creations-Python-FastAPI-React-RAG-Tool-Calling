import type { Config } from "tailwindcss";

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
          50: "#FDF2FB",
          100: "#FBE6F7",
          200: "#F7CCEF",
          300: "#F3B3E7",
          400: "#EF99DF",
          500: "#9E2189", // Main primary (Jamuni)
          600: "#861C74",
          700: "#6E175F", // Primary dark
          800: "#56124A",
          900: "#3E0D35",
          DEFAULT: "#9E2189",
        },
        /**
         * MAVA Color Palette - Secondary Colors (Aam/Mango)
         * ═══════════════════════════════════════════════════════════════════════════════
         */
        secondary: {
          50: "#FFF8E5",
          100: "#FFEEC0",
          200: "#FFE49B",
          300: "#FFDB76",
          400: "#FFD151",
          500: "#FFC72C", // Main secondary (Aam)
          600: "#E6B323", // Secondary dark
          700: "#CC9F1F",
          800: "#B38B1B",
          900: "#997717",
          DEFAULT: "#FFC72C",
        },
        /**
         * Text Colors
         */
        "text-dark": "#1A1A1A",
        "text-light": "#666666",
        jamuni: "#9E2189",
        aam: "#FFC72C",
      },
      backgroundColor: {
        "primary-light": "#FDF2FB",
        "secondary-light": "#FFF8E5",
      },
      textColor: {
        "primary-dark": "#861C74",
        "secondary-dark": "#E6B323",
      },
      borderColor: {
        primary: "#9E2189",
        secondary: "#FFC72C",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
