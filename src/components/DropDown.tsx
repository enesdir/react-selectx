import { DROPDOWN_CONTAINER_CLS, DROPDOWN_CONTAINER_TESTID } from '../constants/testIDs'
import { MouseOrTouchEvent } from '../types'
import { cx } from '../utils/cx'
import { DropDownContent, DropDownContentProps } from './DropDownContent'

import type { MutableRefObject } from 'react'

export type DropDownProps<T = any> = DropDownContentProps<T> &
	Readonly<{
		dropDownRef: MutableRefObject<HTMLDivElement | null>
		isOpenDropDown: boolean
		onMenuMouseDown: (e: MouseOrTouchEvent<HTMLDivElement>) => void
	}>
export const DropDown = <T,>({
	dropDownRef,
	isOpenDropDown,
	onMenuMouseDown,
	...dropDownContentProps
}: DropDownProps<T>) => {
	// if (!isOpenDropDown) {
	// 	return null
	// }

	return (
		<div
			ref={dropDownRef}
			data-testid={DROPDOWN_CONTAINER_TESTID}
			className={cx(DROPDOWN_CONTAINER_CLS, isOpenDropDown ? 'block' : 'hidden')}
			onMouseDown={onMenuMouseDown}
		>
			<DropDownContent {...dropDownContentProps} />
		</div>
	)
}
