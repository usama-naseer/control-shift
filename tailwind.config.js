/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif']
      },
      colors: {
        primary: '#0057FF',
        'background-light': '#F8FAFC',
        'background-dark': '#0f1723',
        'slate-text': '#1E293B',
        'muted-text': '#64748B',
        'border-color': '#E2E8F0',
        'success-teal': '#2DD4BF',
        'dark-card': '#0F172A',
      },
      fontSize: {
        '7xl': ['72px', { lineHeight: '1.1' }],
        '5xl': ['48px', { lineHeight: '1.1' }],
        '4xl': ['40px', { lineHeight: '1.2' }],
        '3xl': ['36px', { lineHeight: '1.2' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'caption': ['10px', { lineHeight: '1.4', letterSpacing: '0.1em', textTransform: 'uppercase' }],
      },
      spacing: {
        '18': '72px',
        '24': '96px',
      },
      maxWidth: {
        '7xl': '1280px',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '16px',
        'full': '9999px'
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'primary': '0 10px 15px -3px rgb(0 87 255 / 0.25)',
        'blue-glow': '0 0 15px rgba(0, 87, 255, 0.5)',
        'time-slot': '0 10px 15px -3px rgb(0 87 255 / 0.2)',
      },
    },
  },
  plugins: [],
}