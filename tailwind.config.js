/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#ff00ff",
          cyan: "#00ffff",
          dark: "#0a0a0a",
        }
      }
    }
  },
  plugins: [],
}
