/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          hover: 'rgb(var(--color-surface-hover) / <alpha-value>)',
          'hover-active': 'rgb(var(--color-surface-hover-active) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        // Quality badge colors
        excellent: 'rgb(var(--color-excellent) / <alpha-value>)',
        good: 'rgb(var(--color-good) / <alpha-value>)',
        fair: 'rgb(var(--color-fair) / <alpha-value>)',
        poor: 'rgb(var(--color-poor) / <alpha-value>)',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    }
  },
  plugins: []
};
