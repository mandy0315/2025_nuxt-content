/** @type {import('tailwindcss').Config} */

const customColors = {
  'c-main-blue': '#47a0f8',
};

module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      textColor: theme => ({
        ...theme('colors'),
        ...customColors,
      }),
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%", // 或是 'none'
          },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
