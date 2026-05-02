/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './App.tsx',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-brand-secondary) / <alpha-value>)',
          accent: 'rgb(var(--color-brand-accent) / <alpha-value>)',
        },
        app: {
          bg: 'rgb(var(--color-app-bg) / <alpha-value>)',
          bgAlt: 'rgb(var(--color-app-bg-alt) / <alpha-value>)',
          surface: 'rgb(var(--color-app-surface) / <alpha-value>)',
          surfaceMuted: 'rgb(var(--color-app-surface-muted) / <alpha-value>)',
          card: 'rgb(var(--color-app-card) / <alpha-value>)',
          cardBorder: 'rgb(var(--color-app-card-border) / <alpha-value>)',
          text: 'rgb(var(--color-app-text) / <alpha-value>)',
          textMuted: 'rgb(var(--color-app-text-muted) / <alpha-value>)',
          textSoft: 'rgb(var(--color-app-text-soft) / <alpha-value>)',
          heroFrom: 'rgb(var(--color-hero-from) / <alpha-value>)',
          heroTo: 'rgb(var(--color-hero-to) / <alpha-value>)',
          shadow: 'rgb(var(--color-app-shadow) / <alpha-value>)',
        },
      },
      boxShadow: {
        soft: '0 12px 30px rgba(29, 53, 87, 0.12)',
        card: '0 10px 24px rgba(15, 23, 42, 0.12)',
        dark: '0 16px 30px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
