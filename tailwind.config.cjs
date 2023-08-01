const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{astro,ts,mdx,tsx}"],
  theme: {
    colors: {
      primary: "#FFD900",
      ...colors,
    },
    extend: {
      fontFamily: {
        sans: ["Apercu", ...fontFamily.sans],
        mono: ["Dank Mono", ...fontFamily.mono],
        serif: ["Ogg", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
