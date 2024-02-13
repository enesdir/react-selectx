import { useCallback, useEffect, useRef } from 'react'

import type { CallbackFn } from '../types'

/**
 * Creates a stable callback function that has access to the latest state and can be used within event
 * handlers and effect callbacks.
 *
 * @param callback The callback to write to ref object
 */
export const useCallbackRef = <T extends CallbackFn>(callback?: T): T => {
	const ref = useRef(callback)

	useEffect(() => {
		ref.current = callback
	})

	return useCallback<CallbackFn>((...args) => ref.current?.(...args), []) as T
}
