/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5D3FD3',
        secondary: '#833FFF',
        dark: '#0F172A',
        light: '#F8FAFC',
        accent: '#22D3EE',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'floating 3s ease-in-out infinite',
        'typing': 'typing 3.5s steps(30, end), blink .75s step-end infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
} 