/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],

  daisyui: {
    themes: [
      {
        omenLight: {
          primary: "#E8488A",
          secondary: "#45AEEE",
          accent: "#701A75",
          neutral: "#1A1A1A",
          "base-100": "#FFFFFF",
          info: "#4AA8C0",
          success: "#BAD455",
          warning: "#EE8133",
          error: "#E93F33",
        },
      },
      {
        omenDark: {
          primary: "#45AEEE",
          secondary: "#E8488A",
          accent: "#701A75",
          neutral: "#FFFFFF",
          "base-100": "#1A1A1A",
          info: "#4AA8C0",
          success: "#BAD455",
          warning: "#EE8133",
          error: "#E93F33",
        },
      },
    ],
    darkTheme: "omenDark",
  },
};

module.exports = config;
