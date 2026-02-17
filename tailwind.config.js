/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 ESTO ES LO QUE TE FALTA

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        cyber: {
          // Definimos el fondo para claro y oscuro
          bg: "var(--cyber-bg)", 
          card: "var(--cyber-card)",
          primary: "#10b981",
        },
        brand: {
          black: "#020617",
          dark: "#0f172a",
          accent: "#22d3ee",
          danger: "#f43f5e",
          warning: "#f59e0b",
          success: "#10b981",
        },

        // 👇 AGREGA ESTO (MUY IMPORTANTE)
        cyber: {
          bg: "#020617",
          card: "#0f172a",
          cardLight: "#ffffff",
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