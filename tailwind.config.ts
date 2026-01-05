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
        wayne: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dae7',
          300: '#a8bcd2',
          400: '#7997b9',
          500: '#5779a1',
          600: '#445f86',
          700: '#384d6d',
          800: '#31425c',
          900: '#2c394e',
          950: '#1d2534',
        },
      },
    },
  },
  plugins: [],
}

export default config