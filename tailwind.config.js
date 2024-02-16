/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  
      rotate: {
        '180': '180deg',
      },
      colors: {
      goldenrod: '#DAA520',
      charcoal: '#051313',
      Navy: '#103548',
      Seafoam : '#8BE5AD',
    },
  },
},

  plugins: [],
}