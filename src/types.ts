/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EventHandler, MouseEvent, ReactNode, TouchEvent } from 'react'

export type CallbackFn = (...args: any[]) => any

export type IconRenderer = ReactNode | ((...args: any[]) => ReactNode)

export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>
export type MouseOrTouchEventHandler<T = Element> = EventHandler<MouseOrTouchEvent<T>>

export type Option<T = any> = {
	[key: string]: any
	disabled?: boolean
	value: T
}
