/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        xl: '1200px',
      },
    },

    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'blue-50': '#EBF0F7',
        'blue-100': '#B7C2CC',
        'blue-200': '#94A4B4',
        'blue-400': '#45617D',
        'blue-500': '#204265',
        'blue-600': '#153454',
        'blue-700': '#102841',
        'blue-800': '#0D1F33',
        'blue-900': '#0A1827',
        'brain-900': '#1A1A1A',
        'greyscaletext-5-div': '#ECECEC',
        'greyscale-10': '#C5C5C5',
        'greyscale-20': '#A9A9A9',
        'greyscale-30': '#828282',
        'greyscale-40': '#6A6A6A',
        'greyscale-50': '#454545',
        'greyscale-60': '#3F3F3F',
        'greyscale-70': '#313131',
        'greyscale-80': '#262626',
        'elevation-10': '#FAFAFA',
        'elevation-20': '#F8F8F8',
        'elevation-30': '#F0F0F0',
        'brown-50': '#F9F4F0',
        'brown-500': '#BE9367',
        'brown-600': '#AD865E',
        'brown-700': '#876849',
        'brown-800': '#695139',
        'orange-0': '#D48E43',
        'validate-error': '#FF424F',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
