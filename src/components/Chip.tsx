/* eslint-disable @typescript-eslint/no-explicit-any */
import { suppressEvent } from '../utils/common'
import { ChipLabel } from './ChipLabel'
import { XIcon } from './icons/XIcon'

type ChipProps = {
	onClick: () => void
	text: string
}
export const Chip = ({ text, onClick }: ChipProps) => {
	return (
		<div className='chip'>
			<ChipLabel text={text} />
			<button type='button' className='chip-button' onClick={onClick} onMouseDown={suppressEvent}>
				<XIcon />
			</button>
		</div>
	)
}
