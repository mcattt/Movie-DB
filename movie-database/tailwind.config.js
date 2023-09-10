/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#330845',
        'light-purple': '#CA98E5',
      },
      spacing: {
        20.125: '20.125rem',
    
      },
      maxWidth:{
        'img-size': '300px',
      },
      screens: {
        "breakpoint-large": '1271px',
        "breakpoint-med": "940px",
        "breakpoint-small": "430px",
      }
    },
  },
  plugins: [],
};
