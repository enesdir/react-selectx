import type { OptionDisabledCallback, OptionFilterCallback, OptionValueCallback } from '../types'

export const FUNCTIONS = {
	optionLabel: ((x) => x.label || `${x}`) as OptionValueCallback<any>,
	optionValue: ((x, index) => x.value || `${index}`) as OptionValueCallback<any>,
	isOptionDisabled: ((x) => !!x.isDisabled) as OptionDisabledCallback<any>,
	optionFilter: ((x) => (typeof x.label === 'string' ? x.label : '' + x.label)) as OptionFilterCallback<any>,
}
