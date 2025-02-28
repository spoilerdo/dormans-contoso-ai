/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin"

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          bounce: 'bounce 1s infinite',
        },
        keyframes: {
          bounce: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        }
      },
    },
    darkMode: 'class',
    plugins: [],
  }