/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAVA Color Palette - Single Source of Truth
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// BRAND ANCHORS
// Jamuni (Deep Purple) - The elegant anchor
export const JAMUNI = {
  50: "#f5f2f7",
  100: "#e6deed",
  200: "#d1c1de",
  300: "#b399ca",
  400: "#8e6db1",
  500: "#3B1E54", // Main Jamuni (Deep Purple)
  600: "#2d1740",
  700: "#241233",
  800: "#1a0d26", // Primary Dark
  900: "#110919",
  950: "#08040d",
};

// Aam (Mango Yellow) - The vibrant contrast
export const AAM = {
  50: "#fff8e1",
  100: "#ffecb3",
  200: "#ffe082",
  300: "#ffd54f",
  400: "#ffca28",
  500: "#FFC107", // Main Aam (Mango Yellow)
  600: "#ffa000",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
};

// Primary & Secondary (Legacy Mapping for compatibility)
export const PRIMARY_DARK = JAMUNI[800];
export const PRIMARY_MEDIUM = JAMUNI[600];
export const PRIMARY_LIGHT = JAMUNI[400];

export const SECONDARY_DARK = AAM[700];
export const SECONDARY_LIGHT = AAM[500];

// Neutrals
export const BG_LIGHT = "#FFFFFF";
export const BG_DARK = "#121212";
export const BG_PURPLE_DARK = JAMUNI[950];

export const colorPalette = {
  jamuni: JAMUNI,
  aam: AAM,
  primary: {
    DEFAULT: "#3B1E54",
    dark: "#1a0d26",
    foreground: "#FFFFFF",
  },
  secondary: {
    DEFAULT: "#FFC107",
    dark: "#f57c00",
    foreground: "#3B1E54",
  },
  background: {
    light: BG_LIGHT,
    dark: BG_DARK,
    premium: BG_PURPLE_DARK,
  },
};

export default colorPalette;
