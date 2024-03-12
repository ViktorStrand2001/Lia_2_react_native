const colors = require("tailwindcss/colors")
const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      primarypink: "#FF83EB",
      bgBlue: "#CAEFFF",
    },
    extend: {},
  },
  plugins: [],
}
