const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#0a0a0a",
        background: "#ffffff",
        foreground: "#0a0a0a",
        primary: {
          DEFAULT: "#1a202c",
          foreground: "#fafafa",
        },
        secondary: {
          DEFAULT: "#2d3748",
          foreground: "#171717",
        },
        destructive: {
          DEFAULT: "#e53e3e",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#737373",
        },
        accent: {
          DEFAULT: "#3182ce",
          foreground: "#171717",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0a0a0a",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0a0a0a",
        },
        neon: {
          purple: "#ff00c1",
          green: "#39ff14",
          blue: "#4deeea",
          red: "#ff3131",
        },
        chart: {
          1: "#e4572e",
          2: "#1fbfa5",
          3: "#48768e",
          4: "#e3b04b",
          5: "#f8b26a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
