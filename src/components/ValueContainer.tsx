/* eslint-disable react/prop-types */
import { Fragment, memo } from 'react'

import { Chip } from './Chip'

import type { SelectProps } from '../Select'
import type { Option } from '../types'

type ValueContainerProps = {
	displayValue: SelectProps['displayValue']
	hasInput: boolean
	isObject: boolean
	onOptionRemove: (value: Option) => void
	placeholder?: string
	selectedOptions: SelectProps['options']
}
export const ValueContainer = memo<ValueContainerProps>(
	({ selectedOptions, onOptionRemove, displayValue, placeholder, isObject, hasInput }) => {
		if (!selectedOptions.length && !hasInput) {
			return <div className='single-value gray-800'>{placeholder}</div>
		}

		return (
			<Fragment>
				{selectedOptions.map((option, i) => (
					<Chip
						key={i}
						onClick={() => onOptionRemove(option)}
						// @ts-expect-error: todo
						text={isObject ? option[displayValue] : (option || '').toString()}
					/>
				))}
			</Fragment>
		)
	}
)

ValueContainer.displayName = 'ValueContainer'
