/* eslint-disable react/prop-types */
import { Fragment, memo } from 'react'

import { Chip } from './Chip'

import type { RenderLabelCallback, RenderSelectMultiOptions, SelectedOption } from '../types'

type ValueContainerProps<T> = Readonly<{
	focusedMultiValue: string | number | null
	hasInput: boolean
	isObject: boolean
	onRemoveSelectedOption: (value?: string | number) => void
	placeholder?: string
	renderOptionLabel: RenderLabelCallback<T>
	renderSelectMultiOptions?: RenderSelectMultiOptions<T>
	selectedOptions: SelectedOption<T>[]
}>
export const ValueContainer = memo(
	<T,>({
		focusedMultiValue,
		selectedOptions,
		renderOptionLabel,
		onRemoveSelectedOption,
		renderSelectMultiOptions,
		placeholder,
		hasInput,
	}: ValueContainerProps<T>) => {
		if (!selectedOptions.length && !hasInput) {
			return <div className='single-value gray-800'>{placeholder}</div>
		}
		return (
			<Fragment>
				{renderSelectMultiOptions
					? renderSelectMultiOptions({ renderOptionLabel, selected: selectedOptions })
					: selectedOptions.map(({ data, value }) => (
							<Chip
								key={value}
								renderOptionLabel={renderOptionLabel}
								onRemoveSelectedOption={onRemoveSelectedOption}
								isFocused={value === focusedMultiValue}
								data={data}
								value={value}
							/>
						))}
			</Fragment>
		)
	}
)

ValueContainer.displayName = 'ValueContainer'
