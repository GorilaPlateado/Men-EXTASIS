/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-900': '#8B0000',
        'amber-300': '#F5F5DC',
        'gray-800': '#2C2C2C',
        'gold': '#D4AF37',
      },
      fontFamily: {
        'playfair': ['MeaCulpa', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
}