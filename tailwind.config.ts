import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9B5DE5',
        'primary-dark': '#7B3FC5',
        'primary-light': '#C89EF5',
        accent1: '#FF6B6B',
        accent2: '#FFB703',
        accent3: '#1D9E75',
        accent4: '#3A86FF',
        accent5: '#F72585',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        baloo: ['"Baloo 2"', 'cursive'],
      },
      animation: {
        bounce2: 'bounce2 1.5s ease-in-out infinite alternate',
        pulse2: 'pulse2 2s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        bounce2: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-8px)' },
        },
        pulse2: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        rainbow:
          'repeating-linear-gradient(135deg,#FFE5E5 0,#FFE5E5 40px,#FFEFD5 40px,#FFEFD5 80px,#FFFBD5 80px,#FFFBD5 120px,#E5FFE5 120px,#E5FFE5 160px,#E5F5FF 160px,#E5F5FF 200px,#EEE5FF 200px,#EEE5FF 240px,#FFE5F5 240px,#FFE5F5 280px)',
      },
    },
  },
  plugins: [],
}

export default config
