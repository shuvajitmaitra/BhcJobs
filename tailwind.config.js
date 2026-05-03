/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        brand: {
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          accent: 'var(--accent)',
        },
        app: {
          bg: 'var(--background)',
          bgAlt: 'var(--muted)',
          surface: 'var(--card)',
          surfaceMuted: 'var(--accent)',
          card: 'var(--card)',
          cardBorder: 'var(--border)',
          text: 'var(--foreground)',
          textMuted: 'var(--muted-foreground)',
          textSoft: 'var(--secondary-foreground)',
          heroFrom: 'var(--primary)',
          heroTo: 'var(--ring)',
          shadow: 'var(--foreground)',
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
