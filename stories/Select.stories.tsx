// import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'

import { Select } from '../src'
import { fruitNames } from './constants/fruitNames'
import { industries } from './constants/industries'

const meta: Meta<typeof Select> = {
	title: 'UI/Select',
	component: Select,
	tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Select>

export const ObjectArraySingle: Story = {
	args: {
		isMulti: false,
		isObject: true,
		displayValue: 'value',
		options: [...industries],
	},
}

export const ObjectArrayMulti: Story = {
	args: {
		isMulti: true,
		isObject: true,
		displayValue: 'value',
		options: [...industries],
	},
}
export const Disabled: Story = {
	args: {
		isDisabled: true,
		isObject: true,
		displayValue: 'value',
		options: [...industries],
	},
}
export const Loading: Story = {
	args: {
		isLoading: true,
		isObject: true,
		displayValue: 'value',
		options: [...industries],
	},
}

export const ObjectArrayGroupedSingle: Story = {
	args: {
		isLoading: false,
		isObject: true,
		isMulti: false,
		groupBy: 'industry',
		displayValue: 'value',
		options: [...industries],
	},
}
export const ObjectArrayGroupedMulti: Story = {
	args: {
		isLoading: false,
		isObject: true,
		isMulti: true,
		groupBy: 'industry',
		displayValue: 'value',
		options: [...industries],
	},
}

export const StringArraySingle: Story = {
	args: {
		isLoading: false,
		isObject: false,
		isMulti: false,
		displayValue: 'value',
		options: [...fruitNames],
	},
}
export const StringArrayMulti: Story = {
	args: {
		isLoading: false,
		isObject: false,
		isMulti: false,
		displayValue: 'value',
		options: [...fruitNames],
	},
}
