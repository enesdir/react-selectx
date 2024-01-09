// classNames (containers)
export const CONTAINER_CLS = 'rsl-container'
export const DROPDOWN_CONTAINER_CLS = 'rsl-dropdown-container'
export const DROPDOWN_CONTENT_CLS = 'rsl-dropdown-content'

const isTest = process.env.NODE_ENV === 'test'
// data-testid attributes used for DOM element querying in unit test cases
// ...this attribute gets rendered in development and test environments (removed in production)
export const CONTAINER_TESTID = isTest ? CONTAINER_CLS : undefined
export const DROPDOWN_CONTAINER_TESTID = isTest ? DROPDOWN_CONTAINER_CLS : undefined
export const DROPDOWN_CONTENT_TESTID = isTest ? DROPDOWN_CONTAINER_CLS : undefined
