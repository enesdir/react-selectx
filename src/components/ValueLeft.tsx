import { cx } from '../utils/cx'

import type { PropsWithChildren } from 'react'

type ValueLeftProps = {
	className?: string
	hasValue?: boolean
	isMulti?: boolean
} & PropsWithChildren
export const ValueLeft = ({ className, hasValue, isMulti, children }: ValueLeftProps) => {
	return <div className={cx('value-left', isMulti && hasValue ? 'grid' : 'flex', className)}>{children}</div>
}
