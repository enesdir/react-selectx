import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import type { ReactNode } from 'react'

import './style.css'

import { Container } from './components/Container'
import { DropDown } from './components/DropDown'
import { SearchInput } from './components/SearchInput'
import { CONTAINER_CLS, CONTAINER_TESTID } from './constants/testIDs'
import { useOnClickOutside } from './hooks/useOnClickOutside'

import type { Option } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */

export type SelectProps<T = any> = {
	descriptionValue?: string
	displayValue?: string
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
export const Select = forwardRef<HTMLDivElement, SelectProps>(
	(
		{
			id = '',
			options = [],
			selectedValues = [],
			isMulti = false,
			isLoading = false,
			isDisabled = false,
			isError = false,
			isShowCheckbox = false,
			isShowClearer = false,
			isCaseSensitiveSearch = false,
			isCloseOnSelect = false,
			isHidePlaceholder = true,
			selectionLimit = -1,
			onSearch,
			onSelect = () => {},
			onRemove = () => {},
			groupBy = '',
			optionValueDecorator = (v) => v,
			placeholder = 'Search...',
			isObject = true,
			displayValue,
			descriptionValue,
			imgValue,
		},
		ref
	) => {
		if (!ref) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			ref = useRef<HTMLDivElement>(null)
		}
		const [selectedOptions, setSelectedOptions] = useState<Option[]>(Object.assign([], selectedValues))
		const [data, setData] = useState<Option[]>(options)
		const [groupedObject, setGroupedObject] = useState<[]>([])
		const [searchTerm, setSearchTerm] = useState<string>('')
		const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)
		const [focused, setFocused] = useState(false)

		const optionTimeout = null

		const handleClickOutside = () => {
			setIsOpenDropDown(false)
			setSearchTerm('')
		}
		// @ts-expect-error: todo
		useOnClickOutside(ref, handleClickOutside)

		const toggleDropDown = () => {
			setIsOpenDropDown(!isOpenDropDown)
		}

		const onFocus = () => {
			if (isOpenDropDown) {
				// @ts-expect-error: todo
				clearTimeout(optionTimeout)
			} else {
				toggleDropDown()
			}
		}
		function onChange(event) {
			setSearchTerm(event.target.value)
			filterOptionsByInput()
			if (onSearch) {
				onSearch(event.target.value)
			}
		}

		function groupByOptions(options: Option[]) {
			const groupedObject = options.reduce(function (r, a) {
				const key = a[groupBy] || 'Others'
				r[key] = r[key] || []
				r[key].push(a)
				return r
			}, Object.create({}))
			setGroupedObject(groupedObject)
		}
		function filterOptionsByInput() {
			let updatedOptions = []
			if (isObject) {
				// @ts-expect-error:todo
				updatedOptions = selectedOptions.filter((i) => matchValues(i[displayValue!], searchTerm))
			} else {
				// @ts-expect-error:todo
				updatedOptions = selectedOptions.filter((i) => matchValues(i, searchTerm))
			}
			groupByOptions(updatedOptions)
			setData(updatedOptions)
		}
		function matchValues(value: Option, searchValue: string) {
			if (isCaseSensitiveSearch) {
				return value.indexOf(searchValue) > -1
			}
			if (value.toLowerCase) {
				return value.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
			}
			return value.toString().indexOf(searchValue) > -1
		}
		function isSelectedValue(item: Option) {
			if (isObject) {
				return selectedOptions.filter((i) => i[displayValue!] === item[displayValue!]).length > 0
			}
			return selectedOptions.filter((i) => i === item).length > 0
		}
		const onRemoveSelectedItem = (item: Option) => {
			const updatedSelectedOptions = [...selectedOptions]
			let index = 0
			if (isObject) {
				index = selectedOptions.findIndex((i) => i[displayValue!] === item[displayValue!])
			} else {
				index = selectedOptions.indexOf(item)
			}
			updatedSelectedOptions.splice(index, 1)
			onRemove(updatedSelectedOptions, item)
			setSelectedOptions(updatedSelectedOptions)
			if (!isCloseOnSelect) {
				setFocused(true)
			}
		}

		const onSingleSelect = (item: Option) => {
			setSelectedOptions([item])
			setIsOpenDropDown(false)
		}
		const fadeOutSelection = (item: Option) => {
			if (!isMulti) {
				return
			}

			if (selectionLimit == -1) {
				return false
			}
			if (selectionLimit != selectedOptions.length) {
				return false
			}
			if (selectionLimit == selectedOptions.length) {
				if (!isShowCheckbox) {
					return true
				} else {
					if (isSelectedValue(item)) {
						return false
					}
					return true
				}
			}
		}
		const onSelectItem = (item: Option) => {
			if (!searchTerm && !isShowCheckbox) {
				setSearchTerm('')
			}
			if (!isMulti) {
				onSingleSelect(item)
				onSelect([item], item)
				return
			}
			if (isSelectedValue(item)) {
				onRemoveSelectedItem(item)
				return
			}
			if (selectionLimit && selectionLimit === selectedOptions.length) {
				return
			}
			const updatedSelectedOptions = [...selectedOptions, item]
			onSelect(updatedSelectedOptions, item)
			setSelectedOptions(updatedSelectedOptions)
			filterOptionsByInput()
			if (!isCloseOnSelect) {
				setFocused(true)
			}
		}

		const initialSetValue = useCallback(() => {
			if (groupBy) {
				groupByOptions(options)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [groupBy, options])

		useEffect(() => {
			if (JSON.stringify(options) !== JSON.stringify(data)) {
				setData(options)
				initialSetValue()
			}
		}, [options, data, initialSetValue])
		function handleOnClear() {
			// eslint-disable-next-line no-console
			console.log('clicked onClear')
		}
		return (
			<Container
				className={CONTAINER_CLS}
				ref={ref}
				id={id || 'selectx-container'}
				isDisabled={isDisabled}
				data-testid={CONTAINER_TESTID}
			>
				<SearchInput
					isOpenDropDown={isOpenDropDown}
					isDisabled={isDisabled}
					isMulti={isMulti}
					isObject={isObject}
					isLoading={isLoading}
					isError={isError}
					isShowClearer={isShowClearer}
					displayValue={displayValue}
					focused={focused}
					placeholder={placeholder}
					isHidePlaceholder={isHidePlaceholder}
					selectedOptions={selectedOptions}
					searchTerm={searchTerm}
					onClear={handleOnClear}
					onClick={toggleDropDown}
					onSearchChange={onChange}
					onSearchFocus={onFocus}
					onOptionRemove={onRemoveSelectedItem}
				/>
				<DropDown
					isMulti={isMulti}
					fadeOutSelection={fadeOutSelection}
					isOpenDropDown={isOpenDropDown}
					options={data}
					groupBy={groupBy}
					searchTerm={searchTerm}
					isShowCheckbox={isShowCheckbox}
					optionValueDecorator={optionValueDecorator}
					groupedObject={groupedObject}
					isSelectedValue={isSelectedValue}
					onSelectItem={onSelectItem}
					displayValue={displayValue}
					imgValue={imgValue}
					descriptionValue={descriptionValue}
					isObject={isObject}
				/>
			</Container>
		)
	}
)

Select.displayName = 'Select'

export default Select
