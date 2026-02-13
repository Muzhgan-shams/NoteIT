/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures it finds your Pink Navbar!
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
