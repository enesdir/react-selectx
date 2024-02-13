// import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'

import { Select } from '../src'
import { MultiParams } from '../src/types'
import { fruitNames } from './constants/fruitNames'
import { Industries, industries } from './constants/industries'

import './storiesStyle.css'

const meta: Meta<typeof Select> = {
	title: 'UI/Select',
	component: Select,
	tags: ['autodocs'],
	// includeStories: ['ObjectArraySingle'],
	args: {
		isLoading: false,
		isDisabled: false,
		isCloseOnSelect: true,
		isHideSelectedOptions: true,
		isBlurInputOnSelect: false,
		isOpenDropDownOnClick: true,
	},
}
export default meta

type Story = StoryObj<typeof Select>

export const ObjectArraySingle: Story = {
	args: {
		isMulti: false,
		getOptionValue: (x: Industries): number => x.id,
		getOptionLabel: (x: Industries): string => x.value,
		options: [...industries],
	},
}

export const ObjectArrayMulti: Story = {
	args: {
		isMulti: true,
		getOptionValue: (x: Industries): number => x.id,
		getOptionLabel: (x: Industries): string => x.value,
		options: [...industries],
	},
}

const renderSelectMultiOptions = ({ selected, renderOptionLabel }: MultiParams<Industries>) => (
	<>
		{selected.length && renderOptionLabel(selected[0].data!)}
		{selected.length > 1 && (
			<span
				style={{ opacity: 0.75, fontSize: '0.75em', marginTop: '0.075em', marginLeft: '0.45em' }}
			>{`(+${selected.length - 1} other${selected.length > 2 ? 's' : ''})`}</span>
		)}
	</>
)

export const ObjectArrayMultiCustomSelect: Story = {
	args: {
		isMulti: true,
		getOptionValue: (x) => x.id,
		getOptionLabel: (x) => x.value,
		options: [...industries],
		renderSelectMultiOptions: renderSelectMultiOptions,
	},
}

export const Disabled: Story = {
	args: {
		isDisabled: true,
		getOptionValue: (x: Industries): number => x.id,
		getOptionLabel: (x: Industries): string => x.value,
		options: [...industries],
	},
}
export const Loading: Story = {
	args: {
		isLoading: true,
		getOptionValue: (x: Industries): number => x.id,
		getOptionLabel: (x: Industries): string => x.value,
		options: [...industries],
	},
}

export const StringArraySingle: Story = {
	args: {
		isMulti: false,
		options: [...fruitNames],
	},
}
export const StringArrayMulti: Story = {
	args: {
		isMulti: true,
		options: [...fruitNames],
	},
}

const createHighlighedOption = (label, searchTerm) => {
	if (searchTerm) {
		const escapedSearchTerm = searchTerm.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
		label = label.replace(new RegExp(escapedSearchTerm, 'i'), '<span class="highlight">$&</span>')
	}
	return {
		__html: label,
	}
}

const HighlightedOption = (option, searchTerm) => {
	return <span dangerouslySetInnerHTML={createHighlighedOption(option, searchTerm)} />
}
export const HighlightSearch: Story = {
	args: {
		isMulti: false,
		options: [...fruitNames],
		optionValueDecorator: HighlightedOption,
	},
}
