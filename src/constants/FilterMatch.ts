export const FilterMatchEnum = {
	ANY: 'any',
	START: 'start',
} as const
export type FilterMatchEnum = (typeof FilterMatchEnum)[keyof typeof FilterMatchEnum]
