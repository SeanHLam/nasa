/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
        colors: {
          'navyBlue': {
            '50': '#e5ebff',
            '100': '#d0daff',
            '200': '#abbaff',
            '300': '#798cff',
            '400': '#454cff',
            '500': '#271bff',
            '600': '#1c00ff',
            '700': '#1800ff',
            '800': '#1600dd',
            '900': '#11037c',
        },
      },
     
    
    },
  },
  plugins: [],
}