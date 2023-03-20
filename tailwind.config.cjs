/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        dvd: "dvd 15s linear infinite",
      },
      keyframes: {
        dvd: {
          "0%": { transform: "translateX(0vw) translateY(0vh) rotate(0deg)" },
          "25%": {
            transform:
              "translateX(calc(100vw - 150px)) translateY(0vh) rotate(180deg)",
          },
          "50%": {
            transform:
              "translateX(calc(100vw - 150px)) translateY(calc(100vh - 150px - 4rem)) rotate(360deg)",
          },
          "75%": {
            transform:
              "translateX(0vw) translateY(calc(100vh - 150px - 4rem)) rotate(540deg)",
          },
          "100%": {
            transform: "translateX(0vw) translateY(0vh) rotate(720deg)",
          },
        },
      },
    },
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
