import { forwardRef } from 'react'

import { cx } from '../utils/cx'

import type { HTMLAttributes, KeyboardEventHandler, PropsWithChildren } from 'react'

type SelectWrapperProps = {
	className?: string
	id?: string | number
	onKeyDown?: KeyboardEventHandler<HTMLDivElement>
	onKeyUp?: KeyboardEventHandler<HTMLDivElement>
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>

export const SelectWrapper = forwardRef<HTMLDivElement, SelectWrapperProps>(
	({ id, className, children, onKeyUp, onKeyDown, ...rest }, ref) => {
		return (
			<div
				{...rest}
				id={id}
				ref={ref}
				className={cx('rsl', className)}
				onKeyUp={onKeyUp}
				onKeyDown={onKeyDown}
			>
				{children}
			</div>
		)
	}
)

SelectWrapper.displayName = 'SelectWrapper'
