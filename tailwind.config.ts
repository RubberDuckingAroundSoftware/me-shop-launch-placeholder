import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-dark": "var(--color-bg-dark)",
        "text-primary": "var(--color-text-primary)",
        "text-body": "var(--color-text-body)",
        "text-muted": "var(--color-text-muted)",
        "text-light": "var(--color-text-light)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        "accent-dark": "var(--color-accent-dark)",
        border: "var(--color-border)",
        "fortune-bar": "var(--color-fortune-bar)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
