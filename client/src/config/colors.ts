/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAVA Color Palette - Single Source of Truth
 * ═══════════════════════════════════════════════════════════════════════════════
 * This is the central color configuration for the entire application.
 * All colors should be referenced from this file to maintain consistency.
 */

// Primary Blues
export const PRIMARY_DARK = "#00296b"; // Darkest primary - Headers, Nav, Primary CTA
export const PRIMARY_MEDIUM = "#003f88"; // Medium primary - Active states, Focus rings
export const PRIMARY_LIGHT = "#00509d"; // Light primary - Hover states, Accents

// Secondary Yellow/Gold
export const SECONDARY_DARK = "#fdc500"; // Dark yellow - Highlight, Badges
export const SECONDARY_LIGHT = "#ffd500"; // Light yellow - Hover states, Secondary CTA

// Text Colors
export const TEXT_ON_PRIMARY = "#ffffff"; // White text on primary colors
export const TEXT_ON_SECONDARY = "#00296b"; // Dark text on secondary colors
export const TEXT_DARK = "#1a1a1a"; // Main body text
export const TEXT_LIGHT = "#666666"; // Secondary text

// Neutral/Background Colors
export const BG_LIGHT = "#ffffff"; // Main background
export const BG_GRAY = "#f5f5f5"; // Secondary background
export const BG_DARK = "#2b2b2b"; // Dark background
export const BORDER_COLOR = "#e0e0e0"; // Default border color

// Semantic Colors
export const SUCCESS = "#0bd462"; // Success state
export const WARNING = "#eff612"; // Warning state
export const DANGER = "#f31260"; // Error/Danger state
export const INFO = "#00509d"; // Info state

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
