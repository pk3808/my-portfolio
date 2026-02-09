/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'legacy': {
          'dark-bg': '#011601', // Main dark background
          'card-dark': '#022a02', // Card dark background
          'accent-bright': '#ADFF2F', // GreenYellow
          'accent-dark': '#045106', // Dark Green
          'input-dark': '#355E3B', // Hunter Green
          'text-highlight': '#10B981', // Emerald 500
        },
        premium: {
          light: '#F8FAFC', // Slate 50
          dark: '#011601', // Override premium.dark to legacy
          slate: '#64748B', // Slate 500
          accent: '#10B981', // Emerald 500
          'accent-dark': '#045106', // Emerald 600
          gold: '#F59E0B', // Amber 500
          cream: '#FDFBF7', // Slightly warm off-white
          navy: '#1E293B', // Slate 800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
