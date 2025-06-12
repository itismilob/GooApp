/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'light-green': '#33AF88',
        'default-green': '#278b6c',
        'dark-green': '#1B624C',
        'light-red': '#FF7373',
        'default-red': '#D05757',
        'dark-red': '#933F3F',
        'default-dark': '#222',
        'transparent-dark': 'rgba(0,0,0,0.5)',
      },
      spacing: {
        'default-gap': '30px', // gap 관련은 spacing에 넣어줌
        'list-gap': '10px',
      },
      height: {
        nav: '90px',
        header: '300px',
        button: '80px',
        list: '60px',
        'div-line': '4px',
      },
      borderRadius: {
        default: '20px',
      },
      fontSize: {
        h1: '50px',
        h2: '40px',
        h3: '30px',
        h4: '20px',
        p: '15px',
      },
    },
  },
  plugins: [],
};
