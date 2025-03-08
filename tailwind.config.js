/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#666666',
        background: '#FFFFFF',
        primaryGreen: '#3e4e42',
      },
    },
  },
  plugins: [],
};
