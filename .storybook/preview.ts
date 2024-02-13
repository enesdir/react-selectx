import type { Preview } from '@storybook/react'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		options: {
			storySort: {
				order: ['Home', 'Changelog', 'Recipes', ['Multi Select', 'Theming'], 'UI', '*'],
			},
		},
	},
}

export default preview
