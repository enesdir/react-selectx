import { useEffect, useRef } from 'react'

import type { DependencyList, EffectCallback } from 'react'

/**
 * `React.useEffect` that will not run on the first render.
 *
 * @param effect The effect to execute
 * @param deps The dependency list
 */
export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
		} else {
			return effect()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)
}
