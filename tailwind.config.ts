import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0C10",
        surface: "#111216",
        surfaceHover: "#18191E",
        border: "#2A2D35",
        primary: "#FFB800",
        primaryHover: "#E6A600",
        foreground: "#FFFFFF",
        muted: "#A0AAB2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to bottom, #111216, #0B0C10)',
      },
    },
  },
  plugins: [],
};
export default config;
