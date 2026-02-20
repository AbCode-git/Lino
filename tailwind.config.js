/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A1A', // Deep Charcoal
          light: '#2D2D2D',
          dark: '#0D0D0D',
        },
        gold: {
          DEFAULT: '#D4AF37', // Metallic Gold
          light: '#E5C76B',
          dark: '#B8860B',
        },
        ivory: '#FFFFF0',
        rose: {
          DEFAULT: '#A86E7C',
          light: '#C48D99',
        },
        silver: '#C0C0C0',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E5C76B 50%, #B8860B 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      transitionProperty: {
        DEFAULT: 'all',
      },
      transitionDuration: {
        DEFAULT: '0.3s',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};