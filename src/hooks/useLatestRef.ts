import { useRef } from 'react'

import type { MutableRefObject } from 'react'

/**
 * Hook to persist value between renders - keeps it up-to-date on changes.
 *
 * @param value The value to persist
 */
export const useLatestRef = <T>(value: T): MutableRefObject<T> => {
	const ref = useRef<T>(value)
	ref.current = value
	return ref
}
