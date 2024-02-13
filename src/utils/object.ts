import { EMPTY_ARRAY } from '../constants/states'

import type { ContentOption, GroupedOption, Option, OptionValueCallback, SelectedOption } from '../types'

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isArrayWithLength = <T>(val: T): boolean => Array.isArray(val) && !!val.length

export const isStringArray = <T>(arr: T): boolean => typeof arr[0] === 'string'

export const isPlainObject = (val: unknown): boolean =>
	val !== null && typeof val === 'object' && !Array.isArray(val)

export const normalizeValue = <T>(
	value: Option<T> | Option<T>[],
	getOptionValue: OptionValueCallback<T>,
	getOptionLabel: OptionValueCallback<T>
): SelectedOption<T>[] => {
	const initVals = Array.isArray(value) ? value : isPlainObject(value) ? [value] : EMPTY_ARRAY
	if (!isArrayWithLength(initVals) || isStringArray(value)) {
		return initVals
	}

	return initVals.map((data) => ({
		data,
		value: getOptionValue(data),
		label: getOptionLabel(data),
	}))
}

const DIACRITICS_REG_EXP = /[\u0300-\u036f]/g
const stripDiacritics = (val: string): string => {
	return val.normalize('NFD').replace(DIACRITICS_REG_EXP, '')
}
export const trimAndFormatFilterStr = (
	value: string,
	filterIgnoreCase: boolean,
	filterIgnoreAccents: boolean
): string => {
	let trimVal = value.trim()
	if (filterIgnoreCase) trimVal = trimVal.toLowerCase()
	return !filterIgnoreAccents ? trimVal : stripDiacritics(trimVal)
}

export function groupByOptions<T>(options: ContentOption<T>[], groupBy: string): GroupedOption<T> {
	const groupedObject: GroupedOption<T> = options.reduce(function (r, a) {
		const key = a[groupBy] || 'Others'
		r[key] = r[key] || []
		r[key].push(a)
		return r
	}, Object.create({}))
	return groupedObject
}
