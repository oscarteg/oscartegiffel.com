const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{astro,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", ...fontFamily.sans],
        mono: ["IBM Plex Mono", ...fontFamily.mono],
        serif: ["IBM Plex Serif", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
