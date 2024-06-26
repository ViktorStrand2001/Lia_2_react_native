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
      customGreen: "#9BC54D",
      primaryBlue: "#5BC0EB",
      primaryBronze: "#CD7F32",
      primarySilver: "#C0C0C0",
      primaryGold: "#FFD700",
    },
    extend: {},
  },
  plugins: [],
}
