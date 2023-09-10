/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#330845",
        "light-purple": "#CA98E5",
      },
      spacing: {
        20.125: '20.125rem',
      },
      screens: {
        'tablet-b': '900px',
        'tablet-s': '700px',
      }
    },
  
  },
  plugins: [],
};
