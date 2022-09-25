const { createPlugin } = require('tailwind-css-variables-theme-generator')
const path = require('path')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    createPlugin({
      entryPoint: path.resolve(__dirname, './src/assets/scss/expose.scss')
    })
  ]
}
