/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				parrot: {
					primary: '#6A655C',
					secondary: '#191615',
					accent: '#A51D2D',
					neutral: '#F3F2F1',
					'base-100': '#DDE0DC',
					info: '#6f88ec',
					success: '#7ce4b3',
					warning: '#d8ae18',
					error: '#f9332f'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
