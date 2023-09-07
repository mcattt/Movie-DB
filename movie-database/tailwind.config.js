/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#330845',
        'light-purple': '#CA98E5',
      },
    },
  },
  plugins: [],
};
