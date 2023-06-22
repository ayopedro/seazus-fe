/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: 'Open Sans, sans-serif' },
      fontSize: 18,
      colors: {
        primary: '#EB568E',
        secondary: '#144EE3',
        dark: '#0B101B',
        grey: { full: '#181E29', mid: '#353C4A' },
        lite: '#C9CED6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        btn: '0px 0px 22px 0px #144EE361',
      },
    },
  },
  plugins: [],
};
