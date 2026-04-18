/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFF', // calm health background
        foreground: '#1E293B',
        primary: {
          light: '#818CF8',
          DEFAULT: '#6366F1', 
          dark: '#4F46E5',
        },
        secondary: {
          light: '#A78BFA',
          DEFAULT: '#8B5CF6', 
          dark: '#7C3AED',
        },
        accent: {
          DEFAULT: '#F59E0B', 
        },
        success: {
          DEFAULT: '#10B981',
        },
        danger: {
          DEFAULT: '#EF4444',
        }
      },
      boxShadow: {
        'soft': '0 20px 40px -15px rgba(99, 102, 241, 0.05)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glass': '0 8px 32px 0 rgba(148, 163, 184, 0.05)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
