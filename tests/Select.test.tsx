import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'

import { Select } from '../src/'
import {
	CONTAINER_CLS,
	CONTAINER_TESTID,
	DROPDOWN_CONTAINER_CLS,
	DROPDOWN_CONTAINER_TESTID,
	DROPDOWN_CONTENT_CLS,
	DROPDOWN_CONTENT_TESTID,
	WRAPPER_CLS,
	WRAPPER_TESTID,
} from '../src/constants/testIDs'

import type { SelectProps } from '../src/SelectType'

// Helper functions for Select component
const renderSelect = (props?: SelectProps) => ({
	user: userEvent.setup(),
	// @ts-ignore: we check just classname
	...render(<Select {...props} />),
})

// Test cases
describe('elements have static className value', () => {
	const { getByTestId } = renderSelect()

	expect(getByTestId(WRAPPER_TESTID!)).toHaveClass(WRAPPER_CLS)
	expect(getByTestId(CONTAINER_TESTID!)).toHaveClass(CONTAINER_CLS)
	expect(getByTestId(CONTAINER_TESTID!)).toHaveClass(CONTAINER_CLS)
	expect(getByTestId(DROPDOWN_CONTAINER_TESTID!)).toHaveClass(DROPDOWN_CONTAINER_CLS)
	expect(getByTestId(DROPDOWN_CONTENT_TESTID!)).toHaveClass(DROPDOWN_CONTENT_CLS)
})
