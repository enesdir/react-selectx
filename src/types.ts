/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	ChangeEventHandler,
	EventHandler,
	FocusEventHandler,
	MouseEvent,
	ReactNode,
	TouchEvent,
} from 'react'

export type CallbackFn = (...args: any[]) => any

export type IconRenderer = ReactNode | ((...args: any[]) => ReactNode)

export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>
export type MouseOrTouchEventHandler<T = Element> = EventHandler<MouseOrTouchEvent<T>>

export type Option<T = any> = {
	[key: string]: any
	disabled?: boolean
	value: T
}

export type SelectXProps<T = any> = {
	className?: string
	displayValue: string
	groupBy?: string
	id?: string
	imgValue?: string
	isCaseSensitiveSearch?: boolean
	isCloseOnSelect?: boolean
	isDisabled?: boolean
	isError?: boolean
	isHidePlaceholder?: boolean
	isLoading?: boolean
	isMulti?: boolean
	isObject?: boolean
	isShowCheckbox?: boolean
	isShowClearer?: boolean
	onRemove?: (selectedList: any, selectedItem: any) => void
	onSearch?: (value: string) => void
	onSelect?: (selectedList: any, selectedItem: any) => void
	optionValueDecorator?: (v: string, option: any) => ReactNode | string
	options: Option<T>[]
	placeholder?: string
	preSelectedValues?: any
	selectedValues?: any
	selectionLimit?: any
}

export type DropDownProps<T = any> = {
	className?: string
	displayValue?: string
	fadeOutSelection: (value: Option) => boolean | undefined
	groupBy?: string
	groupedObject: any[]
	imgValue?: string
	isError?: boolean
	isLoading?: boolean
	isMulti?: boolean
	isObject?: boolean
	isOpenDropDown: boolean
	isSelectedValue: (value: Option) => boolean
	isShowCheckbox?: boolean
	onSelectItem: (item: Option) => void
	optionValueDecorator?: (v: string, option: any) => ReactNode | string
	options: Option<T>[]
	placeholder?: string
	searchTerm: string
	selectedValues?: any
}

export type SearchInputProps = {
	displayValue: SelectXProps['displayValue']
	focused?: boolean
	isDisabled?: boolean
	isError?: boolean
	isHidePlaceholder: SelectXProps['isHidePlaceholder']
	isLoading: boolean
	isMulti: boolean
	isObject: boolean
	isOpenDropDown: boolean
	isShowClearer?: boolean
	onClear: () => void
	onClick: () => void
	onOptionRemove: (value: Option) => void
	onSearchBlur?: FocusEventHandler<HTMLInputElement>
	onSearchChange: ChangeEventHandler<HTMLInputElement>
	onSearchFocus: FocusEventHandler<HTMLInputElement>
	placeholder: SelectXProps['placeholder']
	searchTerm: string
	selectedOptions: SelectXProps['options']
}
