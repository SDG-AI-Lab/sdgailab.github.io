/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        lab: {
          base: '#22242A',
          section: '#2B2E36',
          surface: '#343843',
          elevated: '#3B404C',
          text: '#E4E6EB',
          muted: '#B8BEC8',
          subtle: '#8E96A3',
          border: 'rgba(228, 230, 235, 0.16)',
          accent: '#4C8DFF',
          'accent-soft': '#7FA9FF',
        },
        primary: {
          DEFAULT: '#4C8DFF',
          light: '#7FA9FF',
          dark: '#2F6FE8',
          50: '#EDF4FF',
          100: '#DCEBFF',
          200: '#B8D4FF',
          300: '#8DB8FF',
          400: '#6DA3FF',
          500: '#4C8DFF',
          600: '#2F6FE8',
          700: '#265BC0',
          800: '#224A91',
          900: '#1D365F',
        },
        accent: {
          DEFAULT: '#4C8DFF',
          light: '#7FA9FF',
          dark: '#2F6FE8',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
      keyframes: {
        'landing-float': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translateY(-18px) scale(1.15)', opacity: '0.72' },
        },
        'partner-marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'landing-float': 'landing-float 9s ease-in-out infinite',
        'partner-marquee-scroll': 'partner-marquee-scroll 34s linear infinite',
      },
    },
  },
  plugins: [],
};
