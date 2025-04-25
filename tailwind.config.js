
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        university: {
          blue:    "#0057B7",  // Royal Blue (Primary)
          orange:  "#F7941D",  // Bright Orange (Accent)
          green:   "#D1D700",  // Lime Green (Secondary)
          navy:    "#002060",  // Navy Blue (Neutral Dark)
          gray:    "#4D4D4D",  // Dark Gray (Neutral Base)
        
          // aliases for semantic use
          primary:    "#0057B7",
          accent:     "#F7941D",
          secondary:  "#D1D700",
          neutralDark:"#002060",
          neutralBase:"#4D4D4D",
        },
        permit: {
          valid: "#99CC33",
          pending: "#FF9933",
          expired: "#EF4444",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        neuro: "5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff",
        "neuro-inset": "inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
