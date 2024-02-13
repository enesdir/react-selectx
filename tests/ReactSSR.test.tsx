import { renderToString } from 'react-dom/server'
import { describe, expect } from 'vitest'

import { Select } from '../src'

describe('Select component can be rendered using react-dom/server', () => {
	expect(() => renderToString(<Select />)).not.toThrowError()
})
