import { useEffect } from 'react'

import type { EffectCallback } from 'react'

/**
 * Run an effect only once (on initial mount).
 *
 * @param effect The effect to execute
 */
const useMountEffect = (effect: EffectCallback): void => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(effect, [])
}

export default useMountEffect
