/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#0f172a',
        bgSurface: '#1e293b',
        bgCard: 'rgba(30, 41, 59, 0.75)',
        accentCyan: '#38bdf8',
        accentBlue: '#60a5fa',
        accentIndigo: '#818cf8',
        accentPurple: '#c084fc',
        accentPink: '#f472b6',
        accentEmerald: '#34d399',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
