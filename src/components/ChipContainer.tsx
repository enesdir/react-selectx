import { Option, SelectXProps } from '../types'
import { Chip } from './Chip'

type ChipContainerProps = {
	displayValue: SelectXProps['displayValue']
	isObject: boolean
	onOptionRemove: (value: Option) => void
	selectedOptions: SelectXProps['options']
}
export const ChipContainer = ({
	selectedOptions,
	onOptionRemove,
	displayValue,
	isObject,
}: ChipContainerProps) => {
	return (
		<div className='chip-container'>
			{selectedOptions.map((option, i) => (
				<Chip
					key={i}
					onClick={() => onOptionRemove(option)}
					// @ts-expect-error: todo
					text={isObject ? option[displayValue] : (option || '').toString()}
				/>
			))}
		</div>
	)
}
