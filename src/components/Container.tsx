import { forwardRef } from 'react'

import { cx } from '../utils/cx'

import type { HTMLAttributes, KeyboardEventHandler, PropsWithChildren } from 'react'

type ContainerProps = {
	className?: string
	id?: string | number
	isDisabled?: boolean
	onKeyDown?: KeyboardEventHandler<HTMLDivElement>
	onKeyUp?: KeyboardEventHandler<HTMLDivElement>
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
	({ isDisabled, id, className, children, onKeyUp, onKeyDown, ...rest }, ref) => {
		return (
			<div
				{...rest}
				id={id}
				ref={ref}
				className={cx(
					'rsl',
					className,
					isDisabled ? 'pointer-events-none opacity-75' : 'pointer-events-auto opacity-100'
				)}
				onKeyUp={onKeyUp}
				onKeyDown={onKeyDown}
			>
				{children}
			</div>
		)
	}
)

Container.displayName = 'Container'
