/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#293579',
          light: '#3d4a9e',
          dark: '#1a2460',
          50: '#eef0ff',
          100: '#dde1ff',
          200: '#bbc3ff',
          300: '#8892ff',
          400: '#5560e6',
          500: '#3d4a9e',
          600: '#293579',
          700: '#1a2460',
          800: '#111947',
          900: '#0a0f2e',
        },
        accent: {
          DEFAULT: '#5bbad5',
          light: '#7ecce3',
          dark: '#3a9ab5',
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
