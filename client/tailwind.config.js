/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#03050a',
          900: '#060a14',
          850: '#090f1e',
          800: '#0d162a',
          border: '#15223c',
          borderBright: '#1e3256',
        },
        cobalt: {
          950: '#05112e',
          900: '#0b1f54',
          800: '#153585',
          700: '#1d4ed8',
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
          300: '#93c5fd',
        },
        acid: {
          950: '#172704',
          900: '#274507',
          800: '#3f6212',
          700: '#4d7c0f',
          600: '#65a30d',
          500: '#84cc16',
          400: '#a3e635',
          300: '#bef264',
          200: '#d9f99d',
        },
        danger: '#f43f5e',
        warning: '#f59e0b',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'ghost-float': 'ghostFloat 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '0.99' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.5' },
        },
        ghostFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(163, 230, 53, 0.25)' },
          '50%': { boxShadow: '0 0 35px rgba(37, 99, 235, 0.5)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
