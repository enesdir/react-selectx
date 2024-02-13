/* eslint-disable @typescript-eslint/no-explicit-any */
import { RenderLabelCallback, SelectedOption } from '../types'
import { suppressEvent } from '../utils/common'
import { cx } from '../utils/cx'
import { XIcon } from './icons/XIcon'

type ChipProps<T> = SelectedOption<T> &
	Readonly<{
		isFocused: boolean
		onRemoveSelectedOption: (value?: string | number) => void
		renderOptionLabel: RenderLabelCallback<T>
	}>
export const Chip = <T,>({
	data,
	value,
	onRemoveSelectedOption,
	renderOptionLabel,
	isFocused,
}: ChipProps<T>) => {
	const handleOnClear = () => onRemoveSelectedOption(value)

	return (
		<div className='chip'>
			<span className='chip-label'>{renderOptionLabel(data)}</span>
			<button
				type='button'
				className={cx('chip-button', isFocused && 'focused')}
				onClick={handleOnClear}
				onTouchEnd={handleOnClear}
				onMouseDown={suppressEvent}
			>
				<XIcon />
			</button>
		</div>
	)
}
