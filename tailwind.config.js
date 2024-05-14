/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#FFD15B',
        'custom-gray': '#1B1B1B'
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'anton': ['Anton', 'sans-serif']
      }
    }
  },
  plugins: [],
}