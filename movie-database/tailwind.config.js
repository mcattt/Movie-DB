/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#330845",
        "light-purple": "#CA98E5",
        "bright-orange": "#EB751C",
      },
      spacing: {
        20.125: "20.125rem",
      },
      maxWidth: {
        "img-size": "300px",
      },
      screens: {
        "breakpoint-xl": "1700px",
        "breakpoint-large": "1360px",
        "breakpoint-med": "1035px",
        "breakpoint-small": "690px",
        "breakpoint-xsmall": "500px",
        "tablet-b": "900px",
        "tablet-s": "700px",
        "desktop-1650": "1650px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
