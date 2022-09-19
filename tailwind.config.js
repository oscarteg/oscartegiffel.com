const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{astro,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "gradient-conic-t": "conic-gradient(at top, var(--tw-gradient-stops))",
        "gradient-conic-r": "conic-gradient(at right, var(--tw-gradient-stops))",
        "gradient-conic-b": "conic-gradient(at bottom, var(--tw-gradient-stops))",
        "gradient-conic-l": "conic-gradient(at left, var(--tw-gradient-stops))",
        "gradient-conic-tr": "conic-gradient(at top right, var(--tw-gradient-stops))",
        "gradient-conic-tl": "conic-gradient(at top left, var(--tw-gradient-stops))",
        "gradient-conic-br": "conic-gradient(at bottom right, var(--tw-gradient-stops))",
        "gradient-conic-bl": "conic-gradient(at bottom left, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", ...fontFamily.sans],
        mono: ["IBM Plex Mono", ...fontFamily.mono],
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },

          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            a: {
              color: theme("colors.blue.100"),
              "&:hover": {
                color: theme("colors.blue.100"),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
