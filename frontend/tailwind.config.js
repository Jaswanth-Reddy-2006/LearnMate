/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#5B5BEF',
        accent: '#FF8E8E',
        success: '#31C48D',
        warning: '#F59E0B',
        info: '#38BDF8',
        surface: '#0F172A',
        muted: '#1E293B',
      },
      boxShadow: {
        soft: '0 20px 40px -24px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
}

