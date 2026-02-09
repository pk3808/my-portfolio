/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          light: '#F8FAFC', // Slate 50
          dark: '#0F172A', // Slate 900
          slate: '#64748B', // Slate 500
          accent: '#10B981', // Emerald 500
          'accent-dark': '#059669', // Emerald 600
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
