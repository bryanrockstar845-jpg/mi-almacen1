export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0f1d38', 800: '#16284a', 700: '#1e3560' },
        brand: { blue: '#1f7aec', green: '#2fb67c', orange: '#fb8c2b', purple: '#7a6bd6', teal: '#1fb5c8', dark: '#2b4f8f' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
