import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Select } from '../src/'
import { CONTAINER_CLS, CONTAINER_TESTID } from '../src/constants/testIDs'

import type { SelectProps } from '../src/Select'

// Helper functions for Select component
const renderSelect = (props?: SelectProps) => ({
	user: userEvent.setup(),
	// @ts-ignore: we check just classname
	...render(<Select {...props} />),
})

// Test cases
describe('container elements have static className value', () => {
	const { getByTestId } = renderSelect()

	it('main container has correct classname', () => {
		expect(getByTestId(CONTAINER_TESTID!)).toHaveClass(CONTAINER_CLS)
	})
})
