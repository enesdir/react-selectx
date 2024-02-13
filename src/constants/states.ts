import type { FocusedOption, Option } from '../types'

export enum FocusType {
	SEARCH = 0,
	NONE = -1,
}

export const EMPTY_ARRAY: Option<any>[] = [] // Default for options and selectedOption props
export const FOCUSED_OPTION_DEFAULT: FocusedOption<any> = { index: FocusType.NONE }
