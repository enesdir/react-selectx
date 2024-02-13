import { DROPDOWN_CONTENT_CLS, DROPDOWN_CONTENT_TESTID } from '../constants/testIDs'
import { Option } from './Option'
import { VirtualListRef, WindowVirtualList } from './VirtualList/VirtualList'

import type { MutableRefObject, ReactNode } from 'react'
import type { ContentOption } from '../types'

export type DropDownContentProps<T = any> = {
	contentOptions: ContentOption<T>[]
	contentRef: MutableRefObject<VirtualListRef | null> | undefined
	focusedOptionIndex: number
	isError?: boolean
	isLoading?: boolean
	isMulti?: boolean
	isObject?: boolean
	isShowCheckbox?: boolean
	onSelectOption: (option: ContentOption<T>) => void
	optionValueDecorator?: (v: string, option: any) => ReactNode | string
	placeholder?: string
	renderContentOption: any
	searchTerm: string
	selectedValues?: any
}
export const DropDownContent = <T,>({
	isMulti,
	contentOptions,
	searchTerm,
	focusedOptionIndex,
	contentRef,
	isShowCheckbox,
	optionValueDecorator,
	renderContentOption,
	onSelectOption,
}: DropDownContentProps<T>) => {
	const renderItem = (index: number) => {
		return (
			<Option
				contentOptions={contentOptions}
				index={index}
				isMulti={isMulti}
				searchTerm={searchTerm}
				isShowCheckbox={isShowCheckbox}
				focusedOptionIndex={focusedOptionIndex}
				// @ts-expect-error
				onSelectOption={onSelectOption}
				renderContentOption={renderContentOption}
				optionValueDecorator={optionValueDecorator}
			/>
		)
	}

	return (
		<div data-testid={DROPDOWN_CONTENT_TESTID} className={DROPDOWN_CONTENT_CLS} role='listbox'>
			<WindowVirtualList
				ref={contentRef}
				numElements={contentOptions.length}
				estimatedSize={10}
				overscan={5}
				className='option-container'
			>
				{renderItem}
			</WindowVirtualList>
		</div>
	)
}
