import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Select, SelectProps } from '../src/' // Make sure the path is correct
import { CONTAINER_CLS, CONTAINER_TESTID } from '../src/constants/testIDs'

const renderSelect = (props?: SelectProps) => ({
	user: userEvent.setup(),
	...render(<Select {...props} />),
})
describe('renders component with text', () => {
	const { getByTestId } = renderSelect()

	it('should display that the text', () => {
		// @ts-expect-error:todo
		expect(getByTestId(CONTAINER_TESTID!)).toHaveClass(CONTAINER_CLS)
	})
})
