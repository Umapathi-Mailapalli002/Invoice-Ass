/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},

  },
  plugins: [
    function ({addUtilities}) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scroll-width": "none",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }
      })
    }
  ],
}

