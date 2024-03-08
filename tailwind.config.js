const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primaryPink: "FF83EB",
    },
    extend: {},
  },
  plugins: [],
}
