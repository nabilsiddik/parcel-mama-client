/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', "class"],
  theme: {
  	extend: {
  		fontFamily: {
  			headingFont: [
  				"Poppins", 'serif'
  			],
  			bodyFont: [
  				"Roboto", 'serif'
  			]
  		},
  		colors: {
  			primary: '#FF4438',
  			hover: '#D3382F',
  			dark: '#0F0F0F',
  			darklight: '#282828'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('daisyui'),
      require("tailwindcss-animate")
],
}