/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "darkMode": "var(--body_background)",
      },
      colors: {
        "darkMode": "var(--body_color)",
      },
    },
  },
  plugins: [],
}