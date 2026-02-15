/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#020617",
          dark: "#0f172a",
          accent: "#22d3ee", // Cyan para Shodan
          danger: "#f43f5e", // Rojo para amenazas
          warning: "#f59e0b", // Ámbar para vulnerabilidades
          success: "#10b981", // Verde para sistemas seguros
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}