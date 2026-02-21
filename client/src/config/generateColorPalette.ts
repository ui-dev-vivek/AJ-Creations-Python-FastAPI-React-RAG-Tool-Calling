#!/usr/bin/env node
/**
 * MAVA Color Palette Generator
 * Generates HTML preview of the color system for visual reference
 *
 * Usage: npx ts-node src/config/generateColorPalette.ts
 */

import * as fs from "fs";
import * as path from "path";

const colorPalette = {
  primary: {
    dark: "#00296b",
    medium: "#003f88",
    light: "#00509d",
  },
  secondary: {
    dark: "#fdc500",
    light: "#ffd500",
    gold: "#e6b200",
  },
  text: {
    dark: "#1a1a1a",
    light: "#666666",
    white: "#ffffff",
  },
  background: {
    light: "#ffffff",
    gray: "#f5f5f5",
    dark: "#2b2b2b",
  },
  semantic: {
    success: "#0bd462",
    warning: "#eff612",
    danger: "#f31260",
    info: "#00509d",
  },
};

function generateColorCard(
  name: string,
  hex: string,
  description: string = "",
): string {
  const rgb = hexToRgb(hex);
  return `
    <div class="color-card">
      <div class="color-swatch" style="background-color: ${hex}"></div>
      <div class="color-info">
        <h4>${name}</h4>
        <p class="hex">${hex}</p>
        <p class="rgb">RGB(${rgb?.r}, ${rgb?.g}, ${rgb?.b})</p>
        ${description ? `<p class="description">${description}</p>` : ""}
      </div>
    </div>
  `;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MAVA Color Palette</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }



    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: #00296b;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #666666;
      margin-bottom: 40px;
    }

    .section {
      margin-bottom: 60px;
    }

    .section-title {
      font-size: 1.75rem;
      color: #00296b;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .section-description {
      color: #666666;
      margin-bottom: 20px;
      font-size: 1rem;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .color-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .color-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .color-swatch {
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .color-info {
      padding: 16px;
    }

    .color-info h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #00296b;
    }

    .color-info p {
      font-size: 0.85rem;
      margin: 4px 0;
      color: #666666;
      font-family: 'Monaco', 'Courier New', monospace;
    }

    .color-info .hex {
      font-weight: 600;
      color: #1a1a1a;
    }

    .color-info .description {
      margin-top: 8px;
      color: #888888;
      font-style: italic;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .button-showcase {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background-color: #00296b;
      color: white;
    }

    .btn-primary:hover {
      background-color: #003f88;
    }

    .btn-secondary {
      background-color: #ffd500;
      color: #00296b;
    }

    .btn-secondary:hover {
      background-color: #fdc500;
    }

    .btn-outline {
      background-color: transparent;
      color: #00296b;
      border: 2px solid #00296b;
    }

    .btn-outline:hover {
      background-color: #00296b;
      color: white;
    }

    .text-sample {
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 15px;
      background: white;
    }

    .text-sample h5 {
      font-size: 1.1rem;
      margin-bottom: 8px;
      color: #00296b;
    }

    .text-sample p {
      line-height: 1.6;
    }

    .text-primary {
      color: #00296b;
    }

    .text-secondary {
      color: #ffd500;
    }

    .text-light {
      color: #666666;
    }

    footer {
      text-align: center;
      padding: 40px 20px;
      color: #999999;
      border-top: 1px solid #e0e0e0;
      margin-top: 60px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.5rem;
      }

      .color-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 MAVA Color Palette</h1>
    <p class="subtitle">Complete color system for MAVA Beauty & Home project</p>

    <!-- Primary Colors -->
    <div class="section">
      <h2 class="section-title">Primary Colors</h2>
      <p class="section-description">Used for headers, navigation, primary actions, and brand identity</p>
      <div class="color-grid">
        ${generateColorCard("Primary Dark", "#00296b", "Main primary color for headers and nav")}
        ${generateColorCard("Primary Medium", "#003f88", "Hover states and interactive elements")}
        ${generateColorCard("Primary Light", "#00509d", "Active and pressed states")}
      </div>
    </div>

    <!-- Secondary Colors -->
    <div class="section">
      <h2 class="section-title">Secondary Colors</h2>
      <p class="section-description">Used for CTAs, highlights, badges, and promotional content</p>
      <div class="color-grid">
        ${generateColorCard("Secondary Light", "#ffd500", "Main secondary color for highlights")}
        ${generateColorCard("Secondary Dark", "#fdc500", "Secondary hover state")}
        ${generateColorCard("Gold", "#e6b200", "Secondary active state")}
      </div>
    </div>

    <!-- Text Colors -->
    <div class="section">
      <h2 class="section-title">Text Colors</h2>
      <p class="section-description">For typography and text elements</p>
      <div class="color-grid">
        ${generateColorCard("Text Dark", "#1a1a1a", "Body text and main content")}
        ${generateColorCard("Text Light", "#666666", "Secondary text and metadata")}
        ${generateColorCard("Text White", "#ffffff", "Text on dark backgrounds")}
      </div>
    </div>

    <!-- Background Colors -->
    <div class="section">
      <h2 class="section-title">Background Colors</h2>
      <p class="section-description">For page and component backgrounds</p>
      <div class="color-grid">
        ${generateColorCard("Background Light", "#ffffff", "Main page background")}
        ${generateColorCard("Background Gray", "#f5f5f5", "Secondary sections")}
        ${generateColorCard("Background Dark", "#2b2b2b", "Dark mode backgrounds")}
      </div>
    </div>

    <!-- Semantic Colors -->
    <div class="section">
      <h2 class="section-title">Semantic Colors</h2>
      <p class="section-description">For status and semantic meanings</p>
      <div class="color-grid">
        ${generateColorCard("Success", "#0bd462", "Success states and confirmations")}
        ${generateColorCard("Warning", "#eff612", "Warning and caution messages")}
        ${generateColorCard("Danger", "#f31260", "Error and dangerous actions")}
        ${generateColorCard("Info", "#00509d", "Information and tips")}
      </div>
    </div>

    <!-- Button Examples -->
    <div class="section">
      <h2 class="section-title">Button Examples</h2>
      <p class="section-description">Common button variants using the color system</p>
      <div class="button-showcase">
        <button class="btn-primary">Primary Action</button>
        <button class="btn-secondary">Secondary Action</button>
        <button class="btn-outline">Outline Button</button>
      </div>
    </div>

    <!-- Text Examples -->
    <div class="section">
      <h2 class="section-title">Typography Examples</h2>
      <p class="section-description">How colors are applied to text</p>

      <div class="text-sample">
        <h5>Primary Text</h5>
        <p class="text-primary">This text uses the primary color (#00296b) for emphasis and headers.</p>
      </div>

      <div class="text-sample">
        <h5>Secondary Text</h5>
        <p class="text-secondary">This text uses the secondary color (#ffd500) for highlights and special content.</p>
      </div>

      <div class="text-sample">
        <h5>Light/Muted Text</h5>
        <p class="text-light">This text uses the light color (#666666) for secondary information and descriptions.</p>
      </div>

      <div class="text-sample">
        <h5>Default Text</h5>
        <p>This is default text color (#1a1a1a) used for all body content and main paragraphs.</p>
      </div>
    </div>

    <footer>
      <p>MAVA Color System • Generated on ${new Date().toLocaleDateString()}</p>
      <p style="margin-top: 10px; font-size: 0.9rem;">For complete documentation, see COLORS_AND_STYLING.md</p>
    </footer>
  </div>
</body>
</html>
`;

const outputPath = path.join(__dirname, "../../COLOR_PALETTE.html");
fs.writeFileSync(outputPath, html, "utf-8");
console.log("✅ Color palette HTML generated at: COLOR_PALETTE.html");
console.log("Open the file in your browser to view the complete color system!");
