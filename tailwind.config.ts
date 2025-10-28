import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        deepmobility: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#816dfc',
          600: '#6d5ad6',
          700: '#5b48b0',
          800: '#4a3a8a',
          900: '#3c2e6f',
        },
      },
      screens: {
        'xs': '450px',
      }
    },
  },
  plugins: [],
} satisfies Config;
