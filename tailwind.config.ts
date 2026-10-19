import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#F27025",
        "primary-dark": "#d66320",
        "primary-hover": "#e06822",
        "secondary": "#160F52",
        "background-light": "#F9FAFB",
        "background-dark": "#0B0912",
        "surface-light": "#ffffff",
        "surface-dark": "#181426",
        "text-main": "#181426",
        "text-sub": "#4B4859",
        "border-color": "#E5E3EB",
        "footer-bg": "#160F52",
        "card-dark": "#1e293b",
        "text-muted": "#64748b"
      },
      fontFamily: {
        "sans": ["Inter", "system-ui", "-apple-system", "sans-serif"],
        "serif": ["Playfair Display", "Merriweather", "Libre Baskerville", "Georgia", "serif"],
        "mono": ["Roboto Mono", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "hero-b-rounded": "28px"
      },
      backgroundImage: {
        'texture-dots': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'texture-dots': '20px 20px',
      },
    },
  },
  plugins: [],
};

export default config;
