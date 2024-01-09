import { cx } from '../utils/cx'

import type { MouseEventHandler, MutableRefObject, PropsWithChildren } from 'react'

type SelectContainerProps = {
	className?: string
	isDisabled?: boolean
	isError?: boolean
	isFocused?: boolean
	onClick?: MouseEventHandler<HTMLDivElement>
	selectRef: MutableRefObject<HTMLDivElement | null>
} & PropsWithChildren
export const SelectContainer = ({
	className,
	onClick,
	isDisabled,
	isError,
	isFocused,
	children,
	selectRef,
}: SelectContainerProps) => {
	return (
		<div
			ref={selectRef}
			onClick={onClick}
			className={cx(
				'value-container',
				isDisabled ? 'pointer-events-none disabled select-none' : 'pointer-events-auto',
				isFocused && 'focused',
				isError && 'error',
				className
			)}
		>
			{children}
		</div>
	)
}
