import { Fragment } from 'react'

import { DROPDOWN_CONTENT_CLS, DROPDOWN_CONTENT_TESTID } from '../constants/testIDs'
import { cx } from '../utils/cx'

import type { ReactNode } from 'react'
import type { Option } from '../types'

export type DropDownContentProps<T = any> = {
	descriptionValue?: string
	displayValue?: string
	fadeOutSelection: (value: Option<T>) => boolean | undefined
	groupBy?: string
	groupedObject: any[]
	imgValue?: string
	isError?: boolean
	isLoading?: boolean
	isMulti?: boolean
	isObject?: boolean
	isSelectedValue: (value: Option<T>) => boolean
	isShowCheckbox?: boolean
	onSelectItem: (item: Option<T>) => void
	optionValueDecorator?: (v: string, option: any) => ReactNode | string
	options: Option<T>[]
	placeholder?: string
	searchTerm: string
	selectedValues?: any
}
export const DropDownContent = <T,>({
	isMulti,
	fadeOutSelection,
	options,
	groupBy,
	searchTerm,
	descriptionValue,
	isShowCheckbox,
	optionValueDecorator,
	groupedObject,
	isSelectedValue,
	onSelectItem,
	displayValue,
	imgValue,
	isObject,
}: DropDownContentProps<T>) => {
	const renderGroupByOptions = () => {
		return Object.keys(groupedObject).map((obj) => {
			return (
				<Fragment key={obj}>
					<li className='group-heading'>{obj}</li>
					{groupedObject[obj].map((option, i) => {
						const isSelected = isSelectedValue(option)
						return (
							<li
								key={`option${i}`}
								className={cx(
									'group-child-ele option',
									isSelected && 'selected',
									fadeOutSelection(option) && 'pointer-events-none opacity-75'
								)}
								onClick={() => onSelectItem(option)}
							>
								{isShowCheckbox && isMulti && (
									<input type='checkbox' className='checkbox' readOnly checked={isSelected} />
								)}
								{/* @ts-expect-error: todo better type */}
								{optionValueDecorator(
									isObject ? option[displayValue!] : (option || '').toString(),
									searchTerm
								)}
							</li>
						)
					})}
				</Fragment>
			)
		})
	}
	const renderNormalOption = () => {
		return (
			<>
				{options
					// .filter((option) => option[displayValue].toLowerCase().includes(searchTerm.toLowerCase()))
					.map((option, i) => {
						const isSelected = isSelectedValue(option)
						return (
							<li key={`option${i}`} onClick={() => onSelectItem(option)}>
								{isShowCheckbox && isMulti && (
									<input type='checkbox' readOnly className='checkbox' checked={isSelected} />
								)}
								{imgValue && isObject && (
									<div className='option-image'>
										<img src={option[imgValue]} loading='lazy' />
									</div>
								)}
								<div className='option-content'>
									<span className='option-title'>
										{/* @ts-expect-error: todo better type */}
										{optionValueDecorator(
											isObject ? option[displayValue!] : (option || '').toString(),
											searchTerm
										)}
									</span>
									{isObject && descriptionValue && (
										<span className='option-description'>{option[descriptionValue]}</span>
									)}
								</div>
							</li>
						)
					})}
			</>
		)
	}
	const renderOptionList = () => {
		if (options.length < 1 || !options) {
			return <div className='options-no-data'> no data found</div>
		}
		return <ul className='option-container'> {!groupBy ? renderNormalOption() : renderGroupByOptions()}</ul>
	}
	return (
		<div data-testid={DROPDOWN_CONTENT_TESTID} className={DROPDOWN_CONTENT_CLS}>
			{renderOptionList()}
		</div>
	)
}
