/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  important: "#root",
  theme: {
    extend: {
      width: {
        '112': '28rem',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/forms'),
  ],
}
