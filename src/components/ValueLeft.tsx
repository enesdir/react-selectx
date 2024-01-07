import { cx } from '../utils/cx'

import type { PropsWithChildren } from 'react'

type ValueLeftProps = {
	className?: string
	hasValue?: boolean
} & PropsWithChildren
export const ValueLeft = ({ className, hasValue, children }: ValueLeftProps) => {
	return <div className={cx('value-left', hasValue ? 'flex' : 'grid', className)}>{children}</div>
}
