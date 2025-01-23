const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{astro,ts,mdx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fbdc4e",
      },
      fontFamily: {
        sans: ["Config Rounded", ...fontFamily.sans],
        mono: ["Dank Mono", ...fontFamily.mono],
        serif: ["Ogg", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
