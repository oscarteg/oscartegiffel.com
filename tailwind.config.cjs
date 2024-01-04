const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{astro,ts,mdx,tsx}"],
  theme: {
    colors: {
      primary: "#fbdc4e",
      ...colors,
    },
    extend: {
      fontFamily: {
        sans: ["Config Rounded", ...fontFamily.sans],
        mono: ["Dank Mono", ...fontFamily.mono],
        serif: ["Ogg", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
