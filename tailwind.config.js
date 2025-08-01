/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FFF5F5',
          100: '#FFE6E6',
          200: '#FFCCCC',
          300: '#FF9999',
          400: '#FF6666',
          500: '#CC0000',
          600: '#B30000',
          700: '#990000',
          800: '#800000', // Primary Maroon
          900: '#660000',
        },
        gold: {
          50: '#FFFDE7',
          100: '#FFFACD',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFEB3B',
          600: '#FDD835', // Primary Gold
          700: '#FBC02D',
          800: '#F9A825',
          900: '#F57F17',
        },
        cream: {
          50: '#FDFDFD',
          100: '#F8F8F8',
          200: '#F0F0F0',
          300: '#E8E8E8',
          400: '#E0E0E0',
          500: '#D8D8D8',
          600: '#D0D0D0',
          700: '#C8C8C8',
          800: '#C0C0C0',
          900: '#B8B8B8', // Primary Cream (light off-white)
        },
        pink: {
          50: '#FCE4EC',
          100: '#F8BBD0',
          200: '#F48FB1',
          300: '#F06292',
          400: '#EC407A',
          500: '#E91E63',
          600: '#D81B60',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Open Sans"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'flip-y': 'flipY 4s ease-in-out infinite',
      },
      keyframes: {
        flipY: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
        },
      },
      perspective: {
        1000: '1000px',
      },
      backfaceVisibility: {
        hidden: 'backface-visibility: hidden',
      },
      transformStyle: {
        'preserve-3d': 'transform-style: preserve-3d',
      },
    },
  },
  plugins: [],
}
