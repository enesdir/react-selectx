import { cx } from '../utils/cx'

import type {
	HTMLAttributes,
	MouseEventHandler,
	MutableRefObject,
	PropsWithChildren,
	TouchEventHandler,
} from 'react'

type SelectContainerProps = {
	className?: string
	isDisabled?: boolean
	isError?: boolean
	isFocused?: boolean
	onMouseDown: MouseEventHandler<HTMLDivElement>
	onTouchEnd: TouchEventHandler<HTMLDivElement>
	selectRef: MutableRefObject<HTMLDivElement | null>
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>
export const SelectContainer = ({
	className,
	onMouseDown,
	onTouchEnd,
	isDisabled,
	isError,
	isFocused,
	children,
	selectRef,
	...rest
}: SelectContainerProps) => {
	return (
		<div
			ref={selectRef}
			onMouseDown={onMouseDown}
			onTouchEnd={onTouchEnd}
			className={cx(
				className,
				isDisabled ? 'pointer-events-none disabled select-none' : 'pointer-events-auto',
				isFocused && 'focused',
				isError && 'error'
			)}
			{...rest}
		>
			{children}
		</div>
	)
}
