// classNames (containers)
export const CONTAINER_CLS = 'rsl-container'
const isTest = true

// data-testid attributes used for DOM element querying in unit test cases
// ...this attribute gets rendered in development and test environments (removed in production)
export const CONTAINER_TESTID = isTest ? CONTAINER_CLS : undefined
