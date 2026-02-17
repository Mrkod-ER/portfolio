import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
				body: ['var(--font-body)', 'JetBrains Mono', 'monospace'],
			},
			colors: {
				border: '#000000', // Default border to black for neo-brutalism
				input: '#FFFDF5',
				ring: '#000000',
				background: '#FFFDF5', // bg-neo-white
				foreground: '#121212', // text-neo-black

				// NeoBrutalist Palette
				neo: {
					white: '#FFFDF5',
					black: '#121212',
					yellow: '#FBFF48',
					pink: '#FF70A6',
					blue: '#3B82F6',
					green: '#33FF57',
					purple: '#A855F7',
					orange: '#FF9F1C',
					red: '#FF2A2A',
				},

				primary: {
					DEFAULT: '#FBFF48', // neo-yellow
					foreground: '#121212',
				},
				secondary: {
					DEFAULT: '#FF70A6', // neo-pink
					foreground: '#121212',
				},
				muted: {
					DEFAULT: '#f0f0f0',
					foreground: '#121212',
				},
				accent: {
					DEFAULT: '#3B82F6', // neo-blue
					foreground: '#FFFDF5',
				},
				destructive: {
					DEFAULT: '#FF2A2A', // neo-red
					foreground: '#FFFDF5',
				},
				card: {
					DEFAULT: '#FFFDF5',
					foreground: '#121212',
				},
				popover: {
					DEFAULT: '#FFFDF5',
					foreground: '#121212',
				},
				chart: {
					'1': '#FBFF48',
					'2': '#FF70A6',
					'3': '#33FF57',
					'4': '#3B82F6',
					'5': '#A855F7'
				},
				sidebar: {
					DEFAULT: '#FFFDF5',
					foreground: '#121212',
					primary: '#FBFF48',
					'primary-foreground': '#121212',
					accent: '#3B82F6',
					'accent-foreground': '#FFFDF5',
					border: '#000000',
					ring: '#000000'
				}
			},
			boxShadow: {
				'hard': '4px 4px 0px 0px #000000',
				'hard-sm': '2px 2px 0px 0px #000000',
				'hard-lg': '8px 8px 0px 0px #000000',
				'hard-xl': '12px 12px 0px 0px #000000',
			},
			borderRadius: {
				lg: '0',
				md: '0',
				sm: '0',
				DEFAULT: '0',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'marquee': 'marquee 25s linear infinite',
				'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite'
			}
		}
	},
	plugins: [require('tailwindcss-animate')],
}
export default config
