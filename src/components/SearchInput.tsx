/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'

import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react'

export type SearchInputProps = {
	isDisabled?: boolean
	isError?: boolean
	isLoading: boolean
	isMulti: boolean
	isOpenDropDown: boolean
	isReadOnly?: boolean
	onSearchBlur?: FocusEventHandler<HTMLInputElement>
	onSearchChange: ChangeEventHandler<HTMLInputElement>
	onSearchFocus: FocusEventHandler<HTMLInputElement>
	placeholder: string
	searchInputID?: string
	searchTerm: string
}
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{
			searchInputID,
			isOpenDropDown,
			isDisabled,
			isReadOnly,
			isLoading,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			isMulti,
			searchTerm,
			onSearchFocus,
			onSearchBlur,
			onSearchChange,
		},
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<div className='input-container' data-value={searchTerm}>
				<input
					id={searchInputID}
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
					onChange={!isReadOnly ? onSearchChange : undefined}
					onFocus={onSearchFocus}
					onBlur={onSearchBlur}
					readOnly={isReadOnly}
					disabled={isDisabled || isLoading}
				/>
			</div>
		)
	}
)

SearchInput.displayName = 'SearchInput'
