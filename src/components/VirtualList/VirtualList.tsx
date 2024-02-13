import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { useVirtualizer, useWindowVirtualizer, Virtualizer } from '@tanstack/react-virtual'

import './styles.css'

import { cx } from '../../utils/cx'

interface VirtualListProps {
	children: (index: number) => React.ReactNode
	className?: string
	estimatedSize: number
	getItemKey?: (index: number) => string | number
	itemContainerClassName?: string
	numElements: number
	/**
	 * The number of items to render above and below the visible area. Increasing this number will increase the
	 * amount of time it takes to render the virtualizer, but might decrease the likelihood of seeing
	 * slow-rendering blank items at the top and bottom of the virtualizer when scrolling.
	 */
	overscan?: number // React.Key, but they added bigint while @tanstack/react-virtual used their own Key type
}

export interface VirtualListRef {
	scrollToIndex: Virtualizer<HTMLDivElement, Element>['scrollToIndex']
}

/**
 * A virtual scrolling list linked to a scrollable element. e.g. Item Feed.
 *
 * @see WindowVirtualList for a window-linked virtual scroller.
 */
export const VirtualList = forwardRef(function VirtualList(
	{
		numElements,
		estimatedSize,
		className,
		itemContainerClassName,
		overscan,
		children,
		getItemKey,
	}: VirtualListProps,
	ref: React.ForwardedRef<VirtualListRef>
) {
	// Dynamic-height element-based virtual list code based on https://tanstack.com/virtual/v3/docs/examples/react/dynamic
	const parentRef = useRef<HTMLDivElement>(null)

	const virtualizer = useVirtualizer({
		count: numElements,
		getScrollElement: () => parentRef.current,
		estimateSize: () => estimatedSize,
		getItemKey,
		overscan,
	})

	useImperativeHandle(ref, () => ({ scrollToIndex: virtualizer.scrollToIndex }), [virtualizer.scrollToIndex])

	if (numElements === 0) {
		return null
	}

	const items = virtualizer.getVirtualItems()

	return (
		<div ref={parentRef} className={cx(className, 'scrollContainer')}>
			<div
				className='contentsPlaceholder'
				style={{
					height: virtualizer.getTotalSize(),
				}}
			>
				<div
					className='virtualArea'
					style={{
						transform: `translateY(${items.length > 0 ? items[0].start : 0}px)`,
					}}
				>
					{items.map((virtualItem) => (
						<div
							key={virtualItem.key}
							ref={virtualizer.measureElement}
							className={itemContainerClassName}
							data-index={virtualItem.index}
						>
							{children(virtualItem.index)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
})

/**
 * A virtual scrolling list linked to window scroll. e.g. Optimizer sets or Loadouts.
 *
 * @see VirtualList for an element-linked virtual scroller
 */
export const WindowVirtualList = forwardRef(function WindowVirtualList(
	{
		numElements,
		estimatedSize,
		className,
		itemContainerClassName,
		children,
		overscan,
		getItemKey,
	}: VirtualListProps,
	ref: React.ForwardedRef<VirtualListRef>
) {
	// Dynamic-height window-based virtual list code based on https://tanstack.com/virtual/v3/docs/examples/react/dynamic
	const parentRef = useRef<HTMLDivElement>(null)
	const parentOffsetRef = useRef(0)
	useLayoutEffect(() => {
		parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
	}, [])
	const headerHeightRef = useRef(0)
	useLayoutEffect(() => {
		headerHeightRef.current = parseInt(
			document.querySelector('html')!.style.getPropertyValue('--header-height'),
			10
		)
	}, [])

	const virtualizer = useWindowVirtualizer({
		count: numElements,
		estimateSize: () => estimatedSize,
		scrollMargin: parentOffsetRef.current,
		scrollPaddingStart: headerHeightRef.current,
		getItemKey,
		overscan,
	})

	useImperativeHandle(ref, () => ({ scrollToIndex: virtualizer.scrollToIndex }), [virtualizer.scrollToIndex])

	if (numElements === 0) {
		return null
	}

	const items = virtualizer.getVirtualItems()

	return (
		<div
			className={cx(className, 'contentsPlaceholder')}
			ref={parentRef}
			style={{
				height: `${virtualizer.getTotalSize()}px`,
			}}
		>
			<div
				className='virtualArea'
				style={{
					transform: `translateY(${
						items.length > 0 ? items[0].start - virtualizer.options.scrollMargin : 0
					}px)`,
				}}
			>
				{items.map((virtualItem) => (
					<div
						key={virtualItem.key}
						ref={virtualizer.measureElement}
						className={itemContainerClassName}
						data-index={virtualItem.index}
					>
						{children(virtualItem.index)}
					</div>
				))}
			</div>
		</div>
	)
})
