import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0A0E23',
        'surface': '#121C4A',
        'primary': '#1E90FF',
        'accent': '#00C6FF',
        'pink-accent': '#FF1493',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0AEC0',
        'text-dim': 'rgba(255,255,255,0.5)',
        'glass-border': 'rgba(255,255,255,0.1)',
        'glass-bg': 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'glass': '16px',
        'glass-lg': '24px',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
