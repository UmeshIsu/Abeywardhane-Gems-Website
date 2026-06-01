/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Deep neutrals — ~15% of the palette */
        noir: '#0A0A0A',
        ink: {
          DEFAULT: '#0F172A', // Luxury Navy
          soft: '#475569',
          deep: '#0B1120',
          line: '#1E293B',
        },
        muted: '#64748B',
        line: '#E6EBF3',
        /* Blue highlights — ~25% of the palette */
        sapphire: {
          DEFAULT: '#2563EB', // Royal Sapphire
          deep: '#1D4ED8',
          dark: '#1E3A8A',
          light: '#EEF4FF',
        },
        electric: '#3B82F6', // Electric Blue
        /* Cool premium accent (replaces gold — brief avoids gold-heavy themes) */
        frost: '#9FB6E6',
        platinum: '#AEBED6',
        gold: '#9FB6E6', // legacy key kept on-brand (cool frost)
        /* Whites — ~60% of the palette */
        cream: '#F8FAFD',
        tint: '#EEF3FB',
        mist: '#F1F5FC',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { luxe: '0.35em' },
      boxShadow: {
        soft: '0 4px 18px rgba(15,23,42,0.05)',
        card: '0 22px 50px -22px rgba(15,23,42,0.20)',
        deep: '0 40px 90px -38px rgba(15,23,42,0.40)',
        glow: '0 18px 50px -12px rgba(37,99,235,0.45)',
        ring: '0 0 0 1px rgba(37,99,235,0.10), 0 30px 70px -30px rgba(37,99,235,0.30)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
      },
      animation: {
        blink: 'blink 0.9s steps(1) infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        marquee: 'marquee 36s linear infinite',
        'spin-slow': 'spin 26s linear infinite',
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
