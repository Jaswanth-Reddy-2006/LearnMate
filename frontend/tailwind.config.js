/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', '"Audiowide"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Poppins"', '"Inter"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        neon: {
          50: '#0B0C10',
          100: '#101820',
          200: '#161B22',
          300: '#1C2128',
          400: '#222B36',
          cyan: '#00FFFF',
          violet: '#9B5DE5',
          magenta: '#F15BB5',
          gold: '#FEE440',
          text: '#E6E6E6',
          muted: '#8C8C8C',
        },
        primary: '#00FFFF',
        accent: '#F15BB5',
        success: '#31C48D',
        warning: '#F59E0B',
        info: '#00FFFF',
        surface: '#0B0C10',
        muted: '#8C8C8C',
        navy: {
          50: '#00132d',
          100: '#00193b',
          200: '#001e45',
          300: '#002657',
          400: '#002d67',
          500: '#00377e',
        },
      },
      boxShadow: {
        soft: '0 20px 40px -24px rgba(15, 23, 42, 0.45)',
        'neon-cyan': '0 0 10px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.1)',
        'neon-cyan-lg': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.2)',
        'neon-violet': '0 0 10px rgba(155, 93, 229, 0.3), 0 0 20px rgba(155, 93, 229, 0.1)',
        'neon-magenta': '0 0 10px rgba(241, 91, 181, 0.3), 0 0 20px rgba(241, 91, 181, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
}

