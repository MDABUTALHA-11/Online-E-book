/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00F0FF",
        secondary: "#8B5CF6",
        accent: "#00FF88",
        tealColor: "#00F0FF",
        success: "#00FF88",
        navy: "#0A0E1A",
        "text-main": "#8892A4",
        "text-muted": "#6B7280",
        indigo: "#6366f1",
        rose: "#FF3D71",
        orange: "#F97316",
        purple: "#8B5CF6",
      },
      fontFamily: {
        headings: ['Orbitron', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        bn: ['Noto Sans Bengali', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  safelist: [
    { pattern: /(bg|text|border)-(primary|secondary|accent|indigo|rose|orange|purple)/ },
    { pattern: /(bg|text|border)-(primary|secondary|accent|indigo|rose|orange|purple)\/\d+/ },
  ],
  plugins: [],
}
