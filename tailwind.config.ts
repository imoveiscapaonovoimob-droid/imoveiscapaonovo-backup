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
        primary: "#001629",
        secondary: "#775a19",
        accent: "#CFAF6A",
        "accent-light": "#E5D1A2",
        background: "#f9f9f9",
        "primary-container": "#002b49",
        "gold-accent": "#CFAF6A",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
