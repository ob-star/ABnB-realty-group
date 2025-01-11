/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        primary: "#fea928",
        secondary: "#ed8900",
        'school-light-blue': '#ADD8E6', 
        'school-blue': '#1E3A8A',      // dark blue
        'school-yellow': '#FFD700'
      },
      
      container:{
        center:true,
        padding:{
          DEFAULT: "1rem",
          sm:"3rem"
        }
      }
    },

  },
  plugins: [],
};