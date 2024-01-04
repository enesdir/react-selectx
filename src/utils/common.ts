import { CallbackFn } from '../types'

import type { SyntheticEvent } from 'react'

/** Prevent default behavior and propagation of an event */
export const suppressEvent = (e: SyntheticEvent): void => {
	e.preventDefault()
	e.stopPropagation()
}

export const isFunction = (val: unknown): val is CallbackFn => typeof val === 'function'
