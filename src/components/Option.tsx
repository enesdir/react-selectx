import { memo } from 'react'

import { cx } from '../utils/cx'

import type { ReactNode } from 'react'
import type { ContentOption } from '../types'

type OptionProps<T> = Readonly<{
	contentOptions: ContentOption<T>[]
	focusedOptionIndex: number
	index: number
	isMulti?: boolean
	isShowCheckbox?: boolean
	onSelectOption: (option: ContentOption<T>) => void
	optionValueDecorator?: (v: string, option: any) => ReactNode | string
	renderContentOption: any
	searchTerm: string
}>
export const Option = memo(
	<T,>({
		contentOptions,
		index,
		focusedOptionIndex,
		searchTerm,
		onSelectOption,
		renderContentOption,
		optionValueDecorator,
		isShowCheckbox,
		isMulti,
	}: OptionProps<T>) => {
		const option = contentOptions[index]
		return (
			<li
				onClick={() => onSelectOption(option)}
				className={cx(focusedOptionIndex === index && 'focused', option.isSelected && 'selected')}
				role='option'
				aria-selected={option.isSelected}
				tabIndex={index}
			>
				{renderContentOption ? (
					renderContentOption(option, searchTerm)
				) : (
					<>
						{isShowCheckbox && isMulti && (
							<input type='checkbox' readOnly className='checkbox' checked={option.isSelected} />
						)}
						{option.img && (
							<div className='option-image'>
								<img src={option.img} loading='lazy' />
							</div>
						)}
						<div className='option-content'>
							<span className='option-title'>
								{/* @ts-expect-error: todo better type */}
								{optionValueDecorator(option.label, searchTerm)}
							</span>
							{option.description && <span className='option-description'>{option.description}</span>}
						</div>
					</>
				)}
			</li>
		)
	}
)

Option.displayName = 'Option'
