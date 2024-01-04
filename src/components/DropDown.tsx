import { Fragment } from 'react'

import { cx } from '../utils/cx'

import type { DropDownProps } from '../types'

export const DropDown = <T,>({
	className,
	isMulti,
	fadeOutSelection,
	isOpenDropDown,
	options,
	groupBy,
	searchTerm,
	isShowCheckbox,
	optionValueDecorator,
	groupedObject,
	isSelectedValue,
	onSelectItem,
	displayValue,
	imgValue,
	isObject,
}: DropDownProps<T>) => {
	const renderGroupByOptions = () => {
		return Object.keys(groupedObject).map((obj) => {
			return (
				<Fragment key={obj}>
					<li className='group-heading'>{obj}</li>
					{/* @ts-expect-error: todo better type */}
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
									isObject ? option[displayValue] : (option || '').toString(),
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
											isObject ? option[displayValue] : (option || '').toString(),
											searchTerm
										)}
									</span>
									{isObject && (
										<span className='option-description'>Episode {option['episode']?.length}</span>
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
		<div
			className={cx('options-wrapper', className, isOpenDropDown ? 'block' : 'hidden')}
			onMouseDown={(e) => {
				e.preventDefault()
			}}
		>
			<div className='options-container'>{renderOptionList()}</div>
		</div>
	)
}
