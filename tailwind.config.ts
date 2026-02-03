import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#f6f5f4",
          100: "#e8e6e3",
          200: "#d4d0cb",
          300: "#b5aea5",
          400: "#958c80",
          500: "#7a7166",
          600: "#635c52",
          700: "#524c44",
          800: "#46423b",
          900: "#3d3a34",
          950: "#1f1d1a",
        },
        accent: {
          DEFAULT: "#d97706",
          light: "#f59e0b",
          dark: "#b45309",
        },
      },
    },
  },
  plugins: [],
};
export default config;
