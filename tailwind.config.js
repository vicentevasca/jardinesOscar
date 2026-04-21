/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        green: {
          900: '#16291F',
          800: '#1F3A2E',
          700: '#2E4A36',
          500: '#4F6E52',
          400: '#8AA68B',
          200: '#C8D6B9',
          100: '#E6EDDD',
        },
        wood: {
          700: '#6B4630',
          600: '#8B5E3C',
          500: '#B2795A',
        },
        beige: {
          300: '#E8DFCF',
          200: '#EFE8D8',
          100: '#F5EFE4',
        },
        ink: {
          900: '#1C1A17',
          700: '#4A4740',
          500: '#7A7468',
          400: '#9B958A',
          200: '#E4DED2',
        },
      },
      fontFamily: {
        display: ['Absans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(56px,8vw,120px)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-2': ['clamp(44px,6vw,84px)',  { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'h1':        ['clamp(36px,4.5vw,56px)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'h2':        ['clamp(32px,3.8vw,54px)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'h3':        ['24px', { lineHeight: '1.25' }],
        'lead':      ['19px', { lineHeight: '1.55' }],
        'eyebrow':   ['12px', { lineHeight: '1', letterSpacing: '0.12em' }],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '6px',
        lg: '12px',
      },
      boxShadow: {
        'elev-1': '0 1px 2px rgba(28,26,23,0.06), 0 2px 6px rgba(28,26,23,0.05)',
        'elev-2': '0 4px 10px rgba(28,26,23,0.08), 0 12px 28px rgba(28,26,23,0.10)',
        'elev-3': '0 12px 24px rgba(28,26,23,0.10), 0 32px 60px rgba(28,26,23,0.14)',
      },
      transitionTimingFunction: {
        settle: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      maxWidth: {
        content: '1280px',
        prose: '680px',
      },
    },
  },
  plugins: [],
}
