import { CallbackFn, Option } from '../types'

import type { SyntheticEvent } from 'react'

/** Prevent default behavior and propagation of an event */
export const suppressEvent = (e: SyntheticEvent): void => {
	e.preventDefault()
	e.stopPropagation()
}

export const isFunction = (val: unknown): val is CallbackFn => typeof val === 'function'

export const isArrayWithLength = <T>(val: Option<T>): boolean => Array.isArray(val) && val.length > 0
export function groupByOptions(options: Option[], groupBy: string) {
	const groupedObject = options.reduce(function (r, a) {
		const key = a[groupBy] || 'Others'
		r[key] = r[key] || []
		r[key].push(a)
		return r
	}, Object.create({}))
	return groupedObject
}
