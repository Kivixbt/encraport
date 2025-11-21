/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        encra: {
          950: '#020202', 
          900: '#0A0A0A', 
          800: '#141414', 
          gold: '#D4AF37', 
          goldDim: '#8C7324',
          success: '#10B981',
          danger: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

