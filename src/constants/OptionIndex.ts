export const OptionIndexEnum = {
	UP: 0,
	DOWN: 1,
	LAST: 2,
	FIRST: 3,
	PAGEUP: 4,
	PAGEDOWN: 5,
} as const

export type OptionIndexEnum = (typeof OptionIndexEnum)[keyof typeof OptionIndexEnum]
