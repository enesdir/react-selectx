/* eslint-disable react/prop-types */
import { memo } from 'react'

import { isFunction } from '../utils/common'
import { cx } from '../utils/cx'
import { DownArrow } from './icons/DownArrow'
import { XIcon } from './icons/XIcon'

import type { ReactNode } from 'react'
import type { IconRenderer, MouseOrTouchEventHandler } from '../types'

type ValueRightProps = Readonly<{
	caretIcon?: IconRenderer
	clearIcon?: IconRenderer
	isDisabled?: boolean
	isError?: boolean
	isLoading?: boolean
	isOpenDropDown: boolean
	isShowClearer: boolean
	loadingNode?: ReactNode
	onCaretMouseDown: MouseOrTouchEventHandler
	onClearMouseDown: MouseOrTouchEventHandler
}>

export const ValueRight = memo<ValueRightProps>(
	({
		isOpenDropDown,
		clearIcon,
		caretIcon,
		isError,
		isShowClearer,
		isLoading,
		isDisabled,
		loadingNode,
		onCaretMouseDown,
		onClearMouseDown,
	}) => {
		const iconRenderer = (renderer: IconRenderer): ReactNode => {
			return isFunction(renderer) ? renderer({ isOpenDropDown, isLoading, isError, isDisabled }) : renderer
		}

		return (
			<div className='value-right'>
				{isShowClearer && !isLoading && (
					<div onTouchEnd={onClearMouseDown} onMouseDown={onClearMouseDown} className='indicator-icon'>
						{iconRenderer(clearIcon) || (
							<button role='button' type='button' tabIndex={-1}>
								<XIcon />
							</button>
						)}
					</div>
				)}
				{isLoading && (loadingNode || <div className='spinner' />)}
				<span className='icon-separator' />
				<div onTouchEnd={onCaretMouseDown} onMouseDown={onCaretMouseDown} className='indicator-icon'>
					{iconRenderer(caretIcon) || (
						<button
							className={cx(
								isOpenDropDown ? 'rotate-180 color-active' : 'rotate-0',
								isError && 'color-error'
							)}
							role='button'
							type='button'
							tabIndex={-1}
						>
							<DownArrow />
						</button>
					)}
				</div>
			</div>
		)
	}
)

ValueRight.displayName = 'ValueRight'
