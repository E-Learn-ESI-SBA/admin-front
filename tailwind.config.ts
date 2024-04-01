import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			backgroundImage: {
				'g-crown': 'url(/dashboard/leaderboard/g-crown.png)',
				crown: 'url(/dashboard/leaderboard/crown.png)',
			},
			colors: {
				'bg-courses': '#F4F7FE',
				'courses-main': '#002979',
				'typo-color': {
					h2: '#2B3674',
				},
				red: {
					origin: '#D80027',
					light: '#FFF0F0',
				},
				green: {
					light: '#E1F7E3',
					origin: '#0F930F',
				},
				blue: {
					light: '#EBF8FF',
					origin: '#0066FF',
					font: {
						dark: '#2B3674',
					},
				},
				purple: {
					light: '#EBEBFF',
					origin: '#7F56D9',
				},
				light: {
					medium: '#F1F1F1',
				},
				gray: {
					light: '#F1F1F1',
				},
				'cards-main': '#2B3674',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0066FF',
					text: '#2B3674',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#2B3674',
					white: '#8BA3CB',
					background: '#f4f7fe',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				text: {
					DEFAULT: '#A3AED0',
					GRAY: '#4E5566',
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
				customGray: {
					DEFAULT: '#201D23',
				},
				customBlue: {
					DEFAULT: '#718EBF',
				},
			},
			fontSize: {
				h2: '1.2rem',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
