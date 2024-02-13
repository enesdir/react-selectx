/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EventHandler, MouseEvent, ReactNode, TouchEvent } from 'react'

export type CallbackFn = (...args: any[]) => any

export type Option<T> = T
export type IconRenderer = ReactNode | ((...args: any[]) => ReactNode)
export type OptionValueCallback<T> = (data: Option<T>, index?: number) => string | number
export type OptionDisabledCallback<T> = (data: Option<T>) => boolean
export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>
export type MouseOrTouchEventHandler<T = Element> = EventHandler<MouseOrTouchEvent<T>>
export type GroupedOption<T> = Record<string, ContentOption<T>[]>
export type RenderLabelCallback<T> = (data: Option<T>) => ReactNode
export type OptionFilterCallback<T> = (option: ContentOption<T>) => string

export type MultiParams<T> = Readonly<{
	renderOptionLabel: RenderLabelCallback<T>
	selected: SelectedOption<T>[]
}>

export type RenderSelectMultiOptions<T> = (params: MultiParams<T>) => ReactNode

export type SelectRef<T> = Readonly<{
	blur: () => void
	clearValue: () => void
	dropDownOpen: boolean
	focus: () => void
	setValue: (option: Option<T>) => void
	toggleDropDown: (state?: boolean) => void
}>

export type SelectedOption<T> = {
	data?: T
	label?: string | number
	value?: string | number
}

export type ContentOption<T> = SelectedOption<T> &
	Readonly<{
		description?: string
		img?: string
		isDisabled?: boolean
		isSelected?: boolean
	}>
export type FocusedOption<T> = ContentOption<T> &
	Readonly<{
		index: number
	}>
