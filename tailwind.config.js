/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        headingFont: ["Noto Sans", 'serif'],
        bodyFont: ["Figtree", 'serif']
      },
      colors: {
        primary: '#FF4438',
        hover: '#D3382F',
        dark: '#0F0F0F',
        darklight: '#282828'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}