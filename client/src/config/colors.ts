/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAVA Color Palette - Single Source of Truth
 * ═══════════════════════════════════════════════════════════════════════════════
 * This is the central color configuration for the entire application.
 * All colors should be referenced from this file to maintain consistency.
 */

// Primary Jamuni (Purple)
export const PRIMARY_DARK = "#861C74"; // 600
export const PRIMARY_MEDIUM = "#9E2189"; // 500 / DEFAULT
export const PRIMARY_LIGHT = "#EF99DF"; // 400

// Secondary Aam (Mango)
export const SECONDARY_DARK = "#E6B323"; // 600
export const SECONDARY_LIGHT = "#FFC72C"; // 500 / DEFAULT

// Section Specific Colors
export const COSMETIC_PRIMARY = "#9E2189";
export const COSMETIC_ACCENT = "#F72585";

export const CANDLE_PRIMARY = "#FFC72C";
export const CANDLE_ACCENT = "#FB8500";

export const HANKY_PRIMARY = "#4361EE";
export const HANKY_ACCENT = "#4CC9F0";

export const RESIN_PRIMARY = "#3A0CA3";
export const RESIN_ACCENT = "#4895EF";

// Text Colors
export const TEXT_ON_PRIMARY = "#FFFFFF";
export const TEXT_ON_SECONDARY = "#2B2B2B";
export const TEXT_DARK = "#1A1A1A";
export const TEXT_LIGHT = "#666666";

// Neutral/Background Colors
export const BG_LIGHT = "#FAFAFB";
export const BG_GRAY = "#F4F4F6";
export const BG_DARK = "#0F0F14";
export const BORDER_COLOR = "#DCDCE3";

// Semantic Colors
export const SUCCESS = "#16A34A";
export const WARNING = "#F59E0B";
export const DANGER = "#DC2626";
export const INFO = "#118AB2";

/**
 * Color Sets for Easy Theme Usage
 */
export const colorPalette = {
  primary: {
    dark: PRIMARY_DARK,
    medium: PRIMARY_MEDIUM,
    light: PRIMARY_LIGHT,
    foreground: TEXT_ON_PRIMARY,
  },
  secondary: {
    dark: SECONDARY_DARK,
    light: SECONDARY_LIGHT,
    foreground: TEXT_ON_SECONDARY,
  },
  sections: {
    cosmetic: { primary: COSMETIC_PRIMARY, accent: COSMETIC_ACCENT },
    candle: { primary: CANDLE_PRIMARY, accent: CANDLE_ACCENT },
    hanky: { primary: HANKY_PRIMARY, accent: HANKY_ACCENT },
    resin: { primary: RESIN_PRIMARY, accent: RESIN_ACCENT },
  },
  text: {
    dark: TEXT_DARK,
    light: TEXT_LIGHT,
    onPrimary: TEXT_ON_PRIMARY,
    onSecondary: TEXT_ON_SECONDARY,
  },
  background: {
    light: BG_LIGHT,
    gray: BG_GRAY,
    dark: BG_DARK,
  },
  semantic: {
    success: SUCCESS,
    warning: WARNING,
    danger: DANGER,
    info: INFO,
  },
  border: BORDER_COLOR,
};

export default colorPalette;
