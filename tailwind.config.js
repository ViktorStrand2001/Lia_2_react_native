const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      
    },
    extend: {},
  },
  plugins: [],
}
