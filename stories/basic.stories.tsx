// import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'

import { Select } from '../src'
import { options } from './options'

const meta: Meta<typeof Select> = {
	title: 'UI/Select',
	component: Select,
}
export default meta

type Story = StoryObj<typeof Select>

// export const Example: Story = {
// 	args: {
// 		options: [...options],
// 		value: [],
// 	},
// 	render: function Render(args) {
// 		const [{ value }, updateArgs] = useArgs()

// 		const onChange = (value: string) => {
// 			updateArgs({ ...options, value })
// 		}

// 		return (
// 			<div>
// 				<h1>Select Fruits</h1>
// 				<pre>{JSON.stringify(value)}</pre>
// 				<SelectX {...args} options={options} onChange={onChange} labelledBy={'Select'} isCreatable={true} />
// 			</div>
// 		)
// 	},
// }
export const Multi: Story = {
	args: {
		isMulti: true,
		isObject: true,
		displayValue: 'value',
		options: [...options],
	},
}
export const Disabled: Story = {
	args: {
		isDisabled: true,
		isObject: true,
		displayValue: 'value',
		options: [...options],
	},
}
export const Loading: Story = {
	args: {
		isLoading: true,
		isObject: true,
		displayValue: 'value',
		options: [...options],
	},
}
