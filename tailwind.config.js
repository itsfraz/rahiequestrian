/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b4513', // Saddle Brown
          dark: '#5d2906',
          light: '#a5672f',
        },
        secondary: '#556b2f', // Olive Green
        accent: '#d2b48c', // Tan
        gold: '#c5a059',
        
        // Dynamic Theme Colors using CSS Variables
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: {
          DEFAULT: 'var(--color-text-primary)',
          muted: 'var(--color-text-muted)',
        },
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'premium-sm': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'premium-md': '0 8px 24px rgba(0, 0, 0, 0.12)', // Slightly darker for visibility in dark mode potentially, but transparency handles it
        'premium-lg': '0 16px 48px rgba(0, 0, 0, 0.18)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  darkMode: 'class',
}
