/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
    './scripts/**/*.js',],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#FFD15B',
        'custom-gray': '#1B1B1B',
        'custom-gray-icon': '#7A7A7A',
        'light-gray': '#C6C6C6',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'anton': ['Anton', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {
      margin: ['last'],
    },
  },
  plugins: [],
}