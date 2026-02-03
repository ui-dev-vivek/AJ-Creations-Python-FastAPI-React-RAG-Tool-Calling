/**
 * Color Utility Functions
 * ═══════════════════════════════════════════════════════════════════════════════
 * Helper functions for color manipulations and conversions
 */

import { colorPalette } from './colors';

/**
 * Convert hex color to RGB format
 * @param hex - Hex color code (e.g., '#00296b')
 * @returns RGB object { r, g, b }
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex format
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color code
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Lighten a color by a percentage
 * @param hex - Hex color code
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * (percent / 100)));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * (percent / 100)));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * (percent / 100)));

  return rgbToHex(r, g, b);
}

/**
 * Darken a color by a percentage
 * @param hex - Hex color code
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.max(0, Math.round(rgb.r * (1 - percent / 100)));
  const g = Math.max(0, Math.round(rgb.g * (1 - percent / 100)));
  const b = Math.max(0, Math.round(rgb.b * (1 - percent / 100)));

  return rgbToHex(r, g, b);
}

/**
 * Create a color with opacity
 * @param hex - Hex color code
 * @param alpha - Opacity value (0-1)
 * @returns RGBA color string
 */
export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, Math.max(0, alpha))})`;
}

/**
 * Get contrasting text color (black or white) based on background
 * @param hex - Hex background color
 * @returns '#ffffff' for dark backgrounds, '#000000' for light backgrounds
 */
export function getContrastTextColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';

  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Get the primary color with optional modifier
 * @param modifier - 'dark' | 'medium' | 'light' (default: 'dark')
 * @returns Primary color hex code
 */
export function getPrimaryColor(modifier: 'dark' | 'medium' | 'light' = 'dark'): string {
  const colors = {
    dark: colorPalette.primary.dark,
    medium: colorPalette.primary.medium,
    light: colorPalette.primary.light,
  };
  return colors[modifier];
}

/**
 * Get the secondary color with optional modifier
 * @param modifier - 'dark' | 'light' (default: 'light')
 * @returns Secondary color hex code
 */
export function getSecondaryColor(modifier: 'dark' | 'light' = 'light'): string {
  const colors = {
    dark: colorPalette.secondary.dark,
    light: colorPalette.secondary.light,
  };
  return colors[modifier];
}

/**
 * Get text color for a semantic state
 * @param state - 'success' | 'warning' | 'danger' | 'info'
 * @returns Color hex code
 */
export function getSemanticColor(state: 'success' | 'warning' | 'danger' | 'info'): string {
  const colors = {
    success: colorPalette.semantic.success,
    warning: colorPalette.semantic.warning,
    danger: colorPalette.semantic.danger,
    info: colorPalette.semantic.info,
  };
  return colors[state];
}

/**
 * Create CSS custom properties for colors
 * Useful for dynamic theming
 * @returns CSS variable string
 */
export function createColorCSSVariables(): string {
  return `
    --color-primary-dark: ${colorPalette.primary.dark};
    --color-primary-medium: ${colorPalette.primary.medium};
    --color-primary-light: ${colorPalette.primary.light};
    --color-primary-foreground: ${colorPalette.primary.foreground};
    
    --color-secondary-dark: ${colorPalette.secondary.dark};
    --color-secondary-light: ${colorPalette.secondary.light};
    --color-secondary-foreground: ${colorPalette.secondary.foreground};
    
    --color-text-dark: ${colorPalette.text.dark};
    --color-text-light: ${colorPalette.text.light};
    --color-text-on-primary: ${colorPalette.text.onPrimary};
    --color-text-on-secondary: ${colorPalette.text.onSecondary};
    
    --color-bg-light: ${colorPalette.background.light};
    --color-bg-gray: ${colorPalette.background.gray};
    --color-bg-dark: ${colorPalette.background.dark};
    
    --color-success: ${colorPalette.semantic.success};
    --color-warning: ${colorPalette.semantic.warning};
    --color-danger: ${colorPalette.semantic.danger};
    --color-info: ${colorPalette.semantic.info};
    
    --color-border: ${colorPalette.border};
  `;
}

/**
 * Apply color CSS variables to an element
 * Useful for dynamic theming
 * @param element - DOM element
 */
export function applyColorVariables(element: HTMLElement): void {
  const cssVars = createColorCSSVariables();
  const rules = cssVars.split(';').filter((rule) => rule.trim());

  rules.forEach((rule) => {
    const [key, value] = rule.split(':').map((s) => s.trim());
    if (key && value) {
      element.style.setProperty(key, value);
    }
  });
}

/**
 * Get color palette object
 * @returns Complete color palette
 */
export function getColorPalette() {
  return colorPalette;
}

/**
 * Create a button style object dynamically
 * @param variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @returns Style object
 */
export function getButtonStyles(
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary'
): React.CSSProperties {
  const styles = {
    primary: {
      backgroundColor: colorPalette.primary.dark,
      color: colorPalette.primary.foreground,
      border: `2px solid ${colorPalette.primary.dark}`,
    },
    secondary: {
      backgroundColor: colorPalette.secondary.light,
      color: colorPalette.secondary.foreground,
      border: `2px solid ${colorPalette.secondary.light}`,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colorPalette.primary.dark,
      border: `2px solid ${colorPalette.primary.dark}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colorPalette.primary.dark,
      border: '2px solid transparent',
    },
  };

  return styles[variant] as React.CSSProperties;
}

export default {
  hexToRgb,
  rgbToHex,
  lightenColor,
  darkenColor,
  hexToRgba,
  getContrastTextColor,
  getPrimaryColor,
  getSecondaryColor,
  getSemanticColor,
  createColorCSSVariables,
  applyColorVariables,
  getColorPalette,
  getButtonStyles,
};
