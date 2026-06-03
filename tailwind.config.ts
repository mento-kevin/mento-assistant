import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6600',
          light: '#FF8533',
          dark: '#CC5200',
        },
        success: '#07C160',
        warning: '#FF9500',
        danger: '#FF3B30',
        bg: '#F5F5F5',
        card: '#FFFFFF',
        text: {
          primary: '#333333',
          secondary: '#666666',
          weak: '#999999',
        },
      },
      borderRadius: {
        card: '16px',
        button: '24px',
      },
      spacing: {
        page: '20px',
        card: '16px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
