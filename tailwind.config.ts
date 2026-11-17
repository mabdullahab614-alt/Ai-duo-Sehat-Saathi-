import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cobalt: "#0047FF",
        "cobalt-600": "#0038D6",
        "cobalt-500": "#0047FF",
        "cobalt-400": "#3D6DFF",
        "cobalt-300": "#7C9BFF",
        "cobalt-hover": "#0038D6",
        lime: "#C8FF00",
        "lime-500": "#C8FF00",
        "lime-400": "#D9FF4D",
        "lime-300": "#E9FF8C",
        "lime-hover": "#D9FF4D",
        obsidian: "#05070A",
        "black-900": "#05070A",
        "black-800": "#0B0F14",
        "black-700": "#121821",
        "obsidian-card": "#0B0F14",
        "obsidian-elevated": "#121821",
        offwhite: "#F7F8FA",
        "slate-secondary": "#A7B0BC",
        slateMuted: "#6B7280",
        emergency: "#FF3B30",
        "emergency-fill": "#C62828",
        amberWarn: "#FFB020",
      },
      borderRadius: {
        xs: "8px",
        sm: "12px",
        btn: "14px",
        md: "16px",
        surface: "24px",
        lg: "24px",
        "surface-lg": "32px",
        xl: "32px",
        control: "14px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-space-grotesk)", "ui-sans-serif", "system-ui", "sans-serif"],
        urdu: ["var(--font-noto-nastaliq)", "Noto Nastaliq Urdu", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        surface: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.32)",
        "cobalt-glow": "0 0 0 1px rgba(0, 71, 255, 0.35), 0 12px 40px rgba(0, 71, 255, 0.22)",
        "lime-glow": "0 0 0 1px rgba(200, 255, 0, 0.28), 0 12px 36px rgba(200, 255, 0, 0.14)",
      },
    },
  },
};

export default config;
