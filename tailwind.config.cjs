/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#BD5B5B',
        warm: '#CD853F',
        bg: {
          light: '#EAECEF',
          dark: '#1A1A1A',
        },
        card: {
          blue: '#5B7A96',
          yellow: '#DCA258',
          red: '#BD5B5B',
        },
      },
      boxShadow: {
        toy: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 4px 4px 0px rgba(0,0,0,0.1)',
        'toy-deep': '6px 6px 0px rgba(0,0,0,0.15)',
        float: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
