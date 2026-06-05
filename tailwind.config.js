/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#154d32',
        accent: '#facc15'
      }
    }
  },
  plugins: []
};
