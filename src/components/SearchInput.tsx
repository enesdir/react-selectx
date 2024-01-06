/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useId } from 'react'

import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react'
import type { Option } from '../types'

export type SearchInputProps = {
	focused?: boolean
	isDisabled?: boolean
	isError?: boolean
	isHidePlaceholder: boolean
	isLoading: boolean
	isMulti: boolean
	isOpenDropDown: boolean
	isReadOnly?: boolean
	onClear: () => void
	onClick: () => void
	onOptionRemove: (value: Option) => void
	onSearchBlur?: FocusEventHandler<HTMLInputElement>
	onSearchChange: ChangeEventHandler<HTMLInputElement>
	onSearchFocus: FocusEventHandler<HTMLInputElement>
	placeholder: string
	searchTerm: string
	selectedOptions: Option[]
}
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{
			isOpenDropDown,
			selectedOptions,
			isDisabled,
			isReadOnly,
			isLoading,
			isHidePlaceholder,
			placeholder,
			isMulti,
			searchTerm,
			onClear,
			onSearchFocus,
			onSearchBlur,
			onSearchChange,
		},
		ref: Ref<HTMLInputElement>
	) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const handleOnClear = () => onClear()

		const id = useId()

		return (
			<div className='input-container' data-value={searchTerm}>
				<input
					id={id}
					ref={ref}
					type='text'
					tabIndex={0}
					role='combobox'
					spellCheck={false}
					autoCorrect='off'
					autoComplete='off'
					aria-haspopup={true}
					autoCapitalize='none'
					aria-autocomplete='list'
					value={searchTerm}
					aria-expanded={isOpenDropDown}
					onChange={onSearchChange}
					onFocus={onSearchFocus}
					onBlur={onSearchBlur}
					readOnly={isReadOnly}
					placeholder={
						(!isMulti && selectedOptions.length) || (isHidePlaceholder && selectedOptions.length)
							? ''
							: placeholder
					}
					disabled={!isMulti || isDisabled || isLoading}
				/>
			</div>
		)
	}
)

SearchInput.displayName = 'SearchInput'
