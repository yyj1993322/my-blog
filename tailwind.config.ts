/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" // 如果你使用的是 Next.js 13+ App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [import('@tailwindcss/typography')],
};
