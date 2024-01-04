/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useId, useRef } from 'react'

import { ChipContainer } from './ChipContainer'
import { IndicatorIcons } from './IndicatorIcons'
import { ValueContainer } from './ValueContainer'
import { ValueLeft } from './ValueLeft'

import type { SearchInputProps } from '../types'

export const SearchInput = ({
	isOpenDropDown,
	selectedOptions,
	focused,
	displayValue,
	isObject,
	isDisabled,
	isError,
	isLoading,
	isHidePlaceholder,
	isShowClearer,
	placeholder,
	isMulti,
	searchTerm,
	onClick,
	onClear,
	onSearchFocus,
	onSearchBlur,
	onSearchChange,
	onOptionRemove,
}: SearchInputProps) => {
	const inputSearchRef = useRef<HTMLInputElement>(null)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleOnClear = () => onClear()

	useEffect(() => {
		if (searchTerm) {
			// @ts-expect-error:todo
			inputSearchRef.current.innerText = ''
		}

		if (focused) {
			// @ts-expect-error:todo
			inputSearchRef.current.focus()
		}
	}, [focused, searchTerm])

	const id = useId()

	// eslint-disable-next-line no-console
	const handleOnClearMouseDown = () => console.log('handleOnClearMouseDown clicked')
	// eslint-disable-next-line no-console
	const handleOnCaretMouseDown = () => console.log('handleOnCaretMouseDown clicked')

	return (
		<ValueContainer onClick={onClick} isFocused={focused} isError={isError} isDisabled={isDisabled}>
			<ValueLeft isMulti={isMulti} hasValue={selectedOptions.length > 0}>
				<ChipContainer
					onOptionRemove={onOptionRemove}
					selectedOptions={selectedOptions}
					isObject={isObject}
					displayValue={displayValue}
				/>
				<input
					id={id}
					type='text'
					tabIndex={0}
					role='combobox'
					spellCheck={false}
					autoCorrect='off'
					autoComplete='off'
					aria-haspopup={true}
					autoCapitalize='none'
					aria-autocomplete='list'
					ref={inputSearchRef}
					value={searchTerm}
					aria-expanded={isOpenDropDown}
					onChange={onSearchChange}
					onFocus={onSearchFocus}
					onBlur={onSearchBlur}
					placeholder={
						(!isMulti && selectedOptions.length) || (isHidePlaceholder && selectedOptions.length)
							? ''
							: placeholder
					}
					disabled={!isMulti || isDisabled || isLoading}
				/>
			</ValueLeft>
			<IndicatorIcons
				isOpenDropDown={isOpenDropDown}
				isLoading={isLoading}
				// @ts-expect-error: todo
				isShowClearer={isShowClearer}
				isDisabled={isDisabled}
				isError={isError}
				onClearMouseDown={handleOnClearMouseDown}
				onCaretMouseDown={handleOnCaretMouseDown}
			/>
		</ValueContainer>
	)
}
