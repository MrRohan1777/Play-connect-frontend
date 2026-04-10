/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base palette (from UI Teamplates)
        primary: "#75ff9e",
        secondary: "#b7c6f2",
        background: "#0c1322",
        // Template tokens (used as bg-/text-/border- utilities)
        "surface": "#0c1322",
        "on-surface": "#dce2f8",

        "surface-container": "#191f2f",
        "surface-container-high": "#232a3a",
        "surface-container-highest": "#2e3545",
        "surface-container-low": "#151b2b",
        "surface-container-lowest": "#070e1d",
        "surface-variant": "#2e3545",
        "on-surface-variant": "#bacbb9",

        "primary-container": "#00e676",
        "on-primary-container": "#00612e",
        "on-primary": "#003918",
        "primary-fixed": "#62ff96",
        "primary-fixed-dim": "#00e475",
        "on-primary-fixed-variant": "#005226",
        "inverse-primary": "#006d35",

        "secondary-container": "#3a486e",
        "on-secondary-fixed-variant": "#37466b",
        "secondary-fixed": "#dae2ff",
        "secondary-fixed-dim": "#b7c6f2",
        "on-secondary-fixed": "#091a3d",
        "on-secondary-container": "#a9b7e4",
        "on-secondary": "#202f53",

        "tertiary": "#ffdec4",
        "tertiary-fixed": "#ffdcbf",
        "on-tertiary": "#4b2800",
        "on-tertiary-fixed": "#2d1600",
        "on-tertiary-fixed-variant": "#6a3c03",
        "tertiary-container": "#ffba79",

        "error": "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",

        "outline": "#859585",
        "outline-variant": "#3b4a3d",

        "surface-tint": "#00e475",
        "inverse-surface": "#dce2f8",
        "inverse-on-surface": "#293041",
        "on-background": "#dce2f8",
      },
      fontFamily: {
        headline: ["Lexend"],
        body: ["Manrope"],
        label: ["Manrope"],
      },
    },
  },
  plugins: [],
}