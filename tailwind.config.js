/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        tealColor: "#14B8A6",
        accent: "#F97316",
        neutralBg: "#F8FAFC",
        neutralText: "#64748B",
        success: "#10B981",
        secondary: "#14B8A6",
        "text-main": "#64748B",
        "text-muted": "#64748b",
        indigo: "#6366f1",
        rose: "#f43f5e",
        orange: "#F97316",
        purple: "#8b5cf6",
      },
      fontFamily: {
        headings: ['Poppins', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
        bn: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
      },
    },
  },
  safelist: [
    { pattern: /(bg|text|border)-(primary|secondary|accent|indigo|rose|orange|purple)/ },
    { pattern: /(bg|text|border)-(primary|secondary|accent|indigo|rose|orange|purple)\/\d+/ },
  ],
  plugins: [],
}
