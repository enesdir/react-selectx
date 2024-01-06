import { Fragment } from 'react'

import { Chip } from './Chip'

import type { SelectProps } from '../Select'
import type { Option } from '../types'

type ChipContainerProps = {
	displayValue: SelectProps['displayValue']
	isObject: boolean
	onOptionRemove: (value: Option) => void
	selectedOptions: SelectProps['options']
}
export const ChipContainer = ({
	selectedOptions,
	onOptionRemove,
	displayValue,
	isObject,
}: ChipContainerProps) => {
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
