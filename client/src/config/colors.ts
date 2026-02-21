/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAVA Color Palette - Single Source of Truth
 * ═══════════════════════════════════════════════════════════════════════════════
 * This is the central color configuration for the entire application.
 * All colors should be referenced from this file to maintain consistency.
 */

// BRAND ANCHORS
// Jamuni (Deep Purple) - The elegant anchor
export const JAMUNI = {
  50: "#f5f2f7",
  100: "#e6deed",
  200: "#d1c1de",
  300: "#b399ca",
  400: "#8e6db1",
  500: "#6d4c91", // Main Jamuni
  600: "#5b3f7a",
  700: "#4a3364",
  800: "#3d2a52", // Primary Dark
  900: "#2d1f3d",
  950: "#1d1428",
};

// Aam (Mango Yellow) - The vibrant contrast
export const AAM = {
  50: "#fff8e1",
  100: "#ffecb3",
  200: "#ffe082",
  300: "#ffd54f",
  400: "#ffca28",
  500: "#ffb300", // Main Aam
  600: "#ffa000",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
};

// SECTION-BASED ACCENTS (Wala Themes)
export const WALA_THEMES = {
  CANDILES: {
    primary: "#FFBF00", // Warm Amber
    glow: "rgba(255, 191, 0, 0.4)",
    bg: "#1A1A1A", // Dark cozy bg
  },
  COSMETICS: {
    primary: "#FFD1DC", // Rose Pastel
    accent: "#E75480", // Deep Rose
    bg: "#FFF9FA",
  },
  HANKY: {
    primary: "#E0FFF0", // Fresh Mint
    accent: "#40E0D0", // Turquoise
    bg: "#FFFFFF",
  },
  RASIE: {
    primary: "#D4AF37", // Metallic Gold
    accent: "#8B4513", // Saddle Brown
    bg: "#0F0F0F",
  },
};

// Primary & Secondary (Legacy Mapping for compatibility)
export const PRIMARY_DARK = JAMUNI[800];
export const PRIMARY_MEDIUM = JAMUNI[600];
export const PRIMARY_LIGHT = JAMUNI[400];

export const SECONDARY_DARK = AAM[700];
export const SECONDARY_LIGHT = AAM[500];

// Neutrals
export const BG_LIGHT = "#FFFFFF";
export const BG_DARK = "#121212"; // Deep charcoal instead of pure black
export const BG_PURPLE_DARK = JAMUNI[950]; // For premium dark mode

export const colorPalette = {
  jamuni: JAMUNI,
  aam: AAM,
  wala: WALA_THEMES,
  primary: {
    DEFAULT: JAMUNI[500],
    dark: JAMUNI[800],
    foreground: "#FFFFFF",
  },
  secondary: {
    DEFAULT: AAM[500],
    dark: AAM[700],
    foreground: JAMUNI[900],
  },
  background: {
    light: BG_LIGHT,
    dark: BG_DARK,
    premium: BG_PURPLE_DARK,
  },
};

export default colorPalette;
