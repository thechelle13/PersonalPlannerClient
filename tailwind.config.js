/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      colors: {
      goldenrod: '#DAA520',
      charcoal: '#051313',
      Navy: '#103548',
    },
  },
},

  plugins: [],
}