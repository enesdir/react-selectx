import { useMemo } from 'react'

import { FilterMatchEnum } from '../constants/FilterMatch'
import { FUNCTIONS } from '../constants/functions'
import { isBoolean, trimAndFormatFilterStr } from '../utils/object'
import { useCallbackRef } from './useCallbackRef'

import type {
	ContentOption,
	OptionDisabledCallback,
	OptionFilterCallback,
	OptionValueCallback,
	SelectedOption,
} from '../types'

/** Parse options to array of ContentOptions and perform filtering (if applicable). */
export const useContentOptions = <T>(
	options: T[],
	debouncedSearchTerm: string,
	filterMatchFrom: FilterMatchEnum,
	selectedOptions: SelectedOption<T>[],
	getOptionValue: OptionValueCallback<T>,
	getOptionLabel: OptionValueCallback<T>,
	getIsOptionDisabled?: OptionDisabledCallback<T>,
	getFilterOptionString?: OptionFilterCallback<T>,
	filterIgnoreCase: boolean = false,
	filterIgnoreAccents: boolean = false,
	isMulti: boolean = false,
	isAsync: boolean = false,
	isHideSelectedOptions?: boolean
): ContentOption<T>[] => {
	const getIsOptionDisabledFn = useCallbackRef(getIsOptionDisabled || FUNCTIONS.isOptionDisabled)
	const getFilterOptionStringFn = useCallbackRef(getFilterOptionString || FUNCTIONS.optionFilter)
	const isHideSelectedOptsOrDefault = isBoolean(isHideSelectedOptions) ? isHideSelectedOptions : isMulti
	const searchValue = !isAsync ? debouncedSearchTerm : '' // prevent recomputing on input mutations in async mode

	const contentOptions = useMemo<ContentOption<T>[]>(() => {
		const selectedValues = selectedOptions.map((x) => x.value)
		const isFilterMatchAny = filterMatchFrom === FilterMatchEnum.ANY
		const matchVal = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents)

		const isOptionFilterMatch = (option: ContentOption<T>): boolean => {
			if (!matchVal) return true
			const filterVal = getFilterOptionStringFn(option)
			const normalFilterVal = trimAndFormatFilterStr(filterVal, filterIgnoreCase, filterIgnoreAccents)
			return isFilterMatchAny ? normalFilterVal.includes(matchVal) : normalFilterVal.startsWith(matchVal)
		}

		const parseContentOption = (data: T, index: number): ContentOption<T> | undefined => {
			const value = getOptionValue(data, index)
			const label = getOptionLabel(data)
			// @ts-expect-error
			const img = data?.img ?? data?.image
			// @ts-expect-error
			const description = data?.description ?? data.description
			const isDisabled = getIsOptionDisabledFn(data)
			const isSelected = selectedValues.includes(value)
			const contentOption: ContentOption<T> = { data, value, label, isDisabled, isSelected, img, description }
			return !isOptionFilterMatch(contentOption) || (isHideSelectedOptsOrDefault && isSelected)
				? undefined
				: contentOption
		}

		return options.reduce((acc: ContentOption<T>[], data: T, index: number) => {
			const contentOption = parseContentOption(data, index)
			contentOption && acc.push(contentOption)
			return acc
		}, [])
	}, [
		options,
		searchValue,
		getOptionValue,
		getOptionLabel,
		selectedOptions,
		filterMatchFrom,
		filterIgnoreCase,
		filterIgnoreAccents,
		getIsOptionDisabledFn,
		getFilterOptionStringFn,
		isHideSelectedOptsOrDefault,
	])

	return contentOptions
}
