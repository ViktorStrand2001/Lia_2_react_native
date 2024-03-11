const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primarypink: "#FF83EB",
      bgBlue: "#CAEFFF",
    },
    fontFamily: {},
    extend: {},
  },
  plugins: [],
}
