/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        secondary: "#3b82f6",
        accent: "#facc15",
        "text-main": "#0f172a",
        "text-muted": "#64748b",
        indigo: "#6366f1",
        rose: "#f43f5e",
        orange: "#f97316",
        purple: "#8b5cf6",
      },
      fontFamily: {
        bn: ['Mina', 'sans-serif'],
        en: ['Outfit', 'sans-serif'],
        body: ['Hind Siliguri', 'sans-serif'],
      },
    },
  },
  safelist: [
    { pattern: /(bg|text|border)-(primary|secondary|accent|indigo|rose|orange|purple)/ },
    { pattern: /(bg|text|border)-(primary|secondary|accent|indigo|rose|orange|purple)\/\d+/ },
  ],
  plugins: [],
}
