import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Courier Prime"', '"Chakra Petch"', 'Courier', '"Courier New"', 'monospace'],
        typewriter: ['"Courier Prime"', '"Chakra Petch"', 'Courier', '"Courier New"', 'monospace'],
        thai: ['"Chakra Petch"', '"Courier Prime"', 'Courier', 'monospace'],
      },
      colors: {
        craft: {
          50: '#f7f4ed',
          100: '#ede4d3',
          200: '#dbc8ac',
          300: '#c5a782',
          400: '#a88661',
          500: '#8e6c49',
          600: '#7a5a3c',
          700: '#64472f',
          800: '#523927',
          900: '#432f21',
        },
        paper: {
          light: '#fbf9f4',
          DEFAULT: '#f6f1e6',
          dark: '#ede5d4',
          line: 'rgba(148, 163, 184, 0.45)',
          redline: 'rgba(239, 68, 68, 0.35)',
          ink: '#26201a',
          inkMuted: '#5c5247',
          fiber: '#ffffff',
        },
        stamp: {
          red: '#b91c1c',
          blue: '#1d4ed8',
          green: '#15803d',
          amber: '#b45309',
          purple: '#6d28d9',
        },
      },
      boxShadow: {
        paper: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.12), 0 10px 20px -5px rgba(45, 30, 15, 0.25)',
        paperLg: '0 10px 15px -3px rgba(0, 0, 0, 0.18), 0 4px 6px -4px rgba(0, 0, 0, 0.12), 0 20px 30px -8px rgba(45, 30, 15, 0.35)',
        stamp: 'inset 0 0 0 2px currentColor, 0 1px 2px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
