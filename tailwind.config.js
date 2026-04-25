/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#121212",
          secondary: "#181818",
          elevated: "#282828",
          highlight: "#333333",
        },
        accent: {
          DEFAULT: "#1DB954",
          hover: "#1ed760",
          dark: "#158a3e",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B3B3B3",
          muted: "#727272",
        },
        border: {
          DEFAULT: "#404040",
          light: "#535353",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0, 0, 0, 0.3)",
        md: "0 4px 12px rgba(0, 0, 0, 0.4)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.5)",
        glow: "0 0 20px rgba(29, 185, 84, 0.15)",
      },
    },
  },
  plugins: [],
};
