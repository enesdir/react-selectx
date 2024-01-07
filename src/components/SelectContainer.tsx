import { cx } from '../utils/cx'

import type { MouseEventHandler, PropsWithChildren } from 'react'

type SelectContainerProps = {
	className?: string
	isDisabled?: boolean
	isError?: boolean
	isFocused?: boolean
	onClick?: MouseEventHandler<HTMLDivElement>
} & PropsWithChildren
export const SelectContainer = ({
	className,
	onClick,
	isDisabled,
	isError,
	isFocused,
	children,
}: SelectContainerProps) => {
	return (
		<div
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
