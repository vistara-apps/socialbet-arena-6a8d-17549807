
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(204 94% 36%)',
        accent: 'hsl(10, 95%, 55%)',
        bg: 'hsl(210 40% 98%)',
        surface: 'hsl(0 0% 100%)',
        text: 'hsl(210 11% 15%)',
        muted: 'hsl(210 9% 31%)',
        border: 'hsl(210 18% 87%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 1px 3px hsla(0, 0%, 0%, 0.06), 0 4px 6px hsla(0, 0%, 0%, 0.1), 0 0 0 1px hsla(0, 0%, 0%, 0.03)',
        glow: '0 0 20px hsla(204, 94%, 36%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
