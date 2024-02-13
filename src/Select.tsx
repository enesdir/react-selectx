import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import type { FocusEvent, FormEvent, KeyboardEvent, Ref, SyntheticEvent } from 'react'

import './style.css'

import { DropDown } from './components/DropDown'
import { SearchInput } from './components/SearchInput'
import { SelectContainer } from './components/SelectContainer'
import { SelectWrapper } from './components/SelectWrapper'
import { ValueContainer } from './components/ValueContainer'
import { ValueLeft } from './components/ValueLeft'
import { ValueRight } from './components/ValueRight'
import { VirtualListRef } from './components/VirtualList/VirtualList'
import { FilterMatchEnum } from './constants/FilterMatch'
import { FUNCTIONS } from './constants/functions'
import { KEY } from './constants/keys'
import { OptionIndexEnum } from './constants/OptionIndex'
import { EMPTY_ARRAY, FOCUSED_OPTION_DEFAULT } from './constants/states'
import { CONTAINER_CLS, CONTAINER_TESTID, WRAPPER_CLS, WRAPPER_TESTID } from './constants/testIDs'
import { useCallbackRef } from './hooks/useCallbackRef'
import { useContentOptions } from './hooks/useContentOptions'
import useDebounce from './hooks/useDebounce'
import { useLatestRef } from './hooks/useLatestRef'
import useMountEffect from './hooks/useMountEffect'
import { useUpdateEffect } from './hooks/useUpdateEffect'
import { SelectProps } from './SelectType'
import { isBoolean, isFunction, suppressEvent } from './utils/common'
import { isTouchDevice } from './utils/device'
import { isArrayWithLength, normalizeValue } from './utils/object'

import type {
	ContentOption,
	FocusedOption,
	MouseOrTouchEvent,
	Option,
	OptionValueCallback,
	RenderLabelCallback,
	SelectedOption,
	SelectRef,
} from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const Select = forwardRef(
	<T,>(
		{
			id = '',
			options = EMPTY_ARRAY,
			selectedValues = [],
			isMulti = false,
			isLoading = false,
			isDisabled = false,
			isError = false,
			isShowCheckbox = false,
			isClearable = false,
			isCloseOnSelect = false,
			searchDelay,
			isOpenDropDownOnFocus,
			filterIgnoreAccents,
			filterIgnoreCase,
			isBlurInputOnSelect,
			isOpenDropDownOnClick = true,
			filterMatchFrom = FilterMatchEnum.ANY,
			getIsOptionDisabled,
			getFilterOptionString,
			getOptionLabel,
			getOptionValue,
			renderSelectLabel,
			renderSelectMultiOptions,
			onInputBlur,
			onInputChange,
			onInputFocus,
			onKeyDown,
			onOptionsChange,
			onSearchChange,
			isSearchable = true,
			isBackspaceClearsValue = true,
			tabSelectsOption = true,
			optionValueDecorator = (v) => v,
			placeholder = 'Search...',
			pageSize = 5,
			isAutoFocus,
			isHideSelectedOptions,
			renderContentOption,
			isAsync,
		}: SelectProps<any>,
		ref: Ref<SelectRef<any>>
	) => {
		// DOM element refs
		const selectContainerRef = useRef<HTMLDivElement | null>(null)
		const inputSearchRef = useRef<HTMLInputElement>(null)
		const dropDownRef = useRef<HTMLDivElement | null>(null)
		const contentRef = useRef<VirtualListRef | null>(null)

		// Local state values
		const [searchTerm, setSearchTerm] = useState<string>('')
		const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)
		const [isFocused, setIsFocused] = useState<boolean>(false)
		const [focusedMultiValue, setFocusedMultiValue] = useState<string | number | null>(null)
		const [focusedOption, setFocusedOption] = useState<FocusedOption<T>>(FOCUSED_OPTION_DEFAULT)

		// Memoized callback functions referencing optional function properties on Select.tsx
		const getOptionLabelFn = useMemo<OptionValueCallback<T>>(
			() => getOptionLabel || FUNCTIONS.optionLabel,
			[getOptionLabel]
		)
		const getOptionValueFn = useMemo<OptionValueCallback<T>>(
			() => getOptionValue || FUNCTIONS.optionValue,
			[getOptionValue]
		)
		const renderOptionLabelFn = useMemo<RenderLabelCallback<T>>(
			() => renderSelectLabel || getOptionLabelFn,
			[renderSelectLabel, getOptionLabelFn]
		)

		// Custom hook abstraction that debounces search input value (opt-in)
		const debouncedSearchTerm = useDebounce<string>(searchTerm, searchDelay)

		// Custom ref objects
		const onSearchChangeFn = useCallbackRef(onSearchChange)
		const onOptionChangeFn = useCallbackRef(onOptionsChange)
		const onSearchChangeIsFn = useLatestRef<boolean>(isFunction(onSearchChange))
		const onOptionChangeIsFn = useLatestRef<boolean>(isFunction(onOptionsChange))
		const dropDownOpenRef = useLatestRef<boolean>(isOpenDropDown)
		const onChangeEvtValue = useRef<boolean>(false)
		const prevContentOptionsLength = useRef<number>()

		// If initialValue is specified attempt to initialize, otherwise default to []
		const [selectedOptions, setSelectedOptions] = useState<SelectedOption<T>[]>(() =>
			normalizeValue(selectedValues, getOptionValueFn, getOptionLabelFn)
		)

		// Custom hook abstraction that handles the creation of contentOptions
		const contentOptions = useContentOptions(
			options,
			debouncedSearchTerm,
			filterMatchFrom,
			selectedOptions,
			getOptionValueFn,
			getOptionLabelFn,
			getIsOptionDisabled,
			getFilterOptionString,
			filterIgnoreCase,
			filterIgnoreAccents,
			isMulti,
			isAsync,
			isHideSelectedOptions
		)
		const blurInput = (): void => inputSearchRef.current?.blur()
		const focusInput = (): void => inputSearchRef.current?.focus()
		// TODO:find better approach
		const scrollToItemIndex = (idx: number): void => contentRef.current?.scrollToIndex(idx)
		const hasSelectedOptions = isArrayWithLength(selectedOptions)

		const openDropDownAndFocusOption = useCallback(
			(position: OptionIndexEnum): void => {
				if (!isArrayWithLength(contentOptions)) {
					setIsOpenDropDown(true)
					return
				}

				const selectedIdx = !isMulti ? contentOptions.findIndex((x) => x.isSelected) : -1

				const index =
					selectedIdx > -1 ? selectedIdx : position === OptionIndexEnum.FIRST ? 0 : contentOptions.length - 1

				scrollToItemIndex(index)
				setIsOpenDropDown(true)
				setFocusedMultiValue(null)
				setFocusedOption({ index, ...contentOptions[index] })
			},
			[isMulti, contentOptions]
		)

		const handleRemoveSelectedOption = useCallback((value?: string | number): void => {
			setSelectedOptions((so) => so.filter((x) => x.value !== value))
		}, [])

		const handleSelectOption = useCallback(
			(option: ContentOption<T>): void => {
				if (option.isDisabled) return

				if (option.isSelected) {
					isMulti && handleRemoveSelectedOption(option.value)
				} else {
					const { isSelected, isDisabled, ...selectedOpt } = option
					setSelectedOptions((so) => (!isMulti ? [selectedOpt] : [...so, selectedOpt]))
				}

				const blurOrDefault = isBoolean(isBlurInputOnSelect) ? isBlurInputOnSelect : isTouchDevice()
				if (blurOrDefault) {
					blurInput()
				} else if (isCloseOnSelect) {
					setSearchTerm('')
					setIsOpenDropDown(false)
				}
			},
			[isMulti, isCloseOnSelect, isBlurInputOnSelect, handleRemoveSelectedOption]
		)

		useImperativeHandle(
			ref,
			() => ({
				dropDownOpen: dropDownOpenRef.current,
				blur: blurInput,
				focus: focusInput,
				clearValue: () => {
					setSelectedOptions(EMPTY_ARRAY)
					setFocusedOption(FOCUSED_OPTION_DEFAULT)
				},
				setValue: (option: Option<T>) => {
					setSelectedOptions(normalizeValue(option, getOptionValueFn, getOptionLabelFn))
				},
				toggleDropDown: (state?: boolean) => {
					if (state || (state === undefined && !dropDownOpenRef.current)) {
						focusInput()
						openDropDownAndFocusOption(OptionIndexEnum.FIRST)
					} else {
						blurInput()
					}
				},
			}),
			[dropDownOpenRef, getOptionValueFn, getOptionLabelFn, openDropDownAndFocusOption]
		)

		/**
		 * `useMountEffect`
		 *
		 * If 'autoFocus' true, focus the control following initial mount
		 */
		useMountEffect(() => {
			if (isAutoFocus) {
				focusInput()
			}
		})

		/**
		 * `React.useEffect`
		 *
		 * If 'onSearchChange' function is defined, run as callback when the stateful debouncedSearchTerm updates
		 * check if onChangeEvtValue ref is set true, which indicates the inputValue change was triggered by input
		 * change event
		 */
		useEffect(() => {
			if (onSearchChangeIsFn.current && onChangeEvtValue.current) {
				onChangeEvtValue.current = false
				onSearchChangeFn(debouncedSearchTerm)
			}
		}, [onSearchChangeFn, onSearchChangeIsFn, debouncedSearchTerm])

		/**
		 * `useUpdateEffect`
		 *
		 * Handle passing 'selectedOption' value(s) to onOptionChange callback function prop (if defined)
		 */
		useUpdateEffect(() => {
			if (onOptionChangeIsFn.current) {
				const normalSelectedOpts = isMulti
					? selectedOptions.map((x) => x.data)
					: isArrayWithLength(selectedOptions)
						? selectedOptions[0].data
						: null
				onOptionChangeFn(normalSelectedOpts)
			}
		}, [onOptionChangeFn, onOptionChangeIsFn, isMulti, selectedOptions])

		/**
		 * `useUpdateEffect`
		 *
		 * Handle clearing focused option if contentOptions array has 0 length; Handle contentOptions changes -
		 * conditionally focus first option and do scroll to first option; Handle reseting scroll pos to first
		 * item after the previous search returned zero results (use prevMenuOptionsLen) ...or if there is a
		 * selected item and contentOptions is restored to include it, give it focus
		 */
		useUpdateEffect(() => {
			const curLength = contentOptions.length
			const { current: prevLength } = prevContentOptionsLength
			const inputChanged = curLength > 0 && (isAsync || curLength !== options.length || prevLength === 0)
			const dropDownOpenAndOptionsGrew =
				dropDownOpenRef.current && prevLength !== undefined && prevLength < curLength
			if (curLength === 0) {
				setFocusedOption(FOCUSED_OPTION_DEFAULT)
			} else if (curLength === 1 || inputChanged || dropDownOpenAndOptionsGrew) {
				const index = Math.max(
					0,
					contentOptions.findIndex((x) => x.isSelected)
				)
				scrollToItemIndex(index)
				setFocusedOption({ index, ...contentOptions[index] })
			}
			prevContentOptionsLength.current = curLength
		}, [isAsync, options, dropDownOpenRef, contentOptions])

		const selectOptionFromFocused = (): void => {
			const { index, ...contentOpt } = focusedOption
			if (contentOpt.data) {
				handleSelectOption(contentOpt as ContentOption<T>)
			}
		}

		// only Multiselect mode supports value focusing (ArrowRight || ArrowLeft)
		const focusValueOnArrowKey = (key: string): void => {
			if (!hasSelectedOptions) return

			let focusedIdx = -1
			const lastValueIdx = selectedOptions.length - 1
			const curFocusedIdx = focusedMultiValue
				? selectedOptions.findIndex((x) => x.value === focusedMultiValue)
				: -1

			if (key === KEY.ARROW_RIGHT) {
				focusedIdx = curFocusedIdx > -1 && curFocusedIdx < lastValueIdx ? curFocusedIdx + 1 : -1
			} else {
				focusedIdx = curFocusedIdx !== 0 ? (curFocusedIdx === -1 ? lastValueIdx : curFocusedIdx - 1) : 0
			}

			const nextFocusedVal = focusedIdx > -1 ? selectedOptions[focusedIdx].value! : null

			if (focusedOption.data) setFocusedOption(FOCUSED_OPTION_DEFAULT)
			if (nextFocusedVal !== focusedMultiValue) setFocusedMultiValue(nextFocusedVal)
		}

		const focusOptionOnArrowKey = (direction: OptionIndexEnum): void => {
			if (!isArrayWithLength(contentOptions)) return

			let index = focusedOption.index
			switch (direction) {
				case OptionIndexEnum.UP: {
					index = focusedOption.index > 0 ? focusedOption.index - 1 : contentOptions.length - 1
					break
				}
				case OptionIndexEnum.DOWN: {
					index = (focusedOption.index + 1) % contentOptions.length
					break
				}
				case OptionIndexEnum.PAGEUP: {
					const pageIdx = focusedOption.index - pageSize
					index = pageIdx < 0 ? 0 : pageIdx
					break
				}
				case OptionIndexEnum.PAGEDOWN: {
					const pageIdx = focusedOption.index + pageSize
					index = pageIdx > contentOptions.length - 1 ? contentOptions.length - 1 : pageIdx
					break
				}
			}

			scrollToItemIndex(index)
			focusedMultiValue && setFocusedMultiValue(null)
			setFocusedOption({ index, ...contentOptions[index] })
		}
		const handleOnKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
			if (isDisabled) return

			if (onKeyDown) {
				onKeyDown(e, searchTerm, focusedOption)
				if (e.defaultPrevented) return
			}

			switch (e.key) {
				case KEY.ARROW_DOWN: {
					isOpenDropDown
						? focusOptionOnArrowKey(OptionIndexEnum.DOWN)
						: openDropDownAndFocusOption(OptionIndexEnum.FIRST)
					break
				}
				case KEY.ARROW_UP: {
					isOpenDropDown
						? focusOptionOnArrowKey(OptionIndexEnum.UP)
						: openDropDownAndFocusOption(OptionIndexEnum.LAST)
					break
				}
				case KEY.ARROW_LEFT:
				case KEY.ARROW_RIGHT: {
					if (!isMulti || searchTerm || renderSelectMultiOptions) return
					focusValueOnArrowKey(e.key)
					break
				}
				case KEY.PAGE_UP: {
					if (!isOpenDropDown) return
					focusOptionOnArrowKey(OptionIndexEnum.PAGEUP)
					break
				}
				case KEY.PAGE_DOWN: {
					if (!isOpenDropDown) return
					focusOptionOnArrowKey(OptionIndexEnum.PAGEDOWN)
					break
				}
				// handle spacebar keydown events
				case ' ': {
					if (searchTerm) return
					if (!isOpenDropDown) {
						openDropDownAndFocusOption(OptionIndexEnum.FIRST)
					} else if (!focusedOption.data) {
						return
					} else {
						selectOptionFromFocused()
					}

					break
				}
				case KEY.ENTER: {
					if (!isOpenDropDown) return
					selectOptionFromFocused()
					break
				}
				case KEY.ESCAPE: {
					if (isOpenDropDown) {
						setIsOpenDropDown(false)
						setSearchTerm('')
					}
					break
				}
				case KEY.TAB: {
					if (e.shiftKey || !isOpenDropDown || !tabSelectsOption || !focusedOption.data) {
						return
					}
					selectOptionFromFocused()
					break
				}
				case KEY.DELETE:
				case KEY.BACKSPACE: {
					if (searchTerm) return

					if (focusedMultiValue) {
						const focusedIdx = selectedOptions.findIndex((x) => x.value === focusedMultiValue)
						const nextFocusedMultiValue =
							focusedIdx > -1 && focusedIdx < selectedOptions.length - 1
								? selectedOptions[focusedIdx + 1].value!
								: null

						handleRemoveSelectedOption(focusedMultiValue)
						setFocusedMultiValue(nextFocusedMultiValue)
					} else {
						if (!isBackspaceClearsValue) return
						if (!hasSelectedOptions) break

						if (isMulti && !renderSelectMultiOptions) {
							const { value } = selectedOptions[selectedOptions.length - 1]
							handleRemoveSelectedOption(value)
						} else if (isShowClearer) {
							setSelectedOptions(EMPTY_ARRAY)
						}
					}

					break
				}
				default:
					return
			}

			e.preventDefault()
		}

		const handleOnControlMouseDown = (e: MouseOrTouchEvent<HTMLElement>): void => {
			if (isDisabled) return
			if (!isFocused) focusInput()

			const isNotInput = (e.target as HTMLElement).nodeName !== 'INPUT'
			if (!isOpenDropDown) {
				isOpenDropDownOnClick && openDropDownAndFocusOption(OptionIndexEnum.FIRST)
			} else if (isNotInput) {
				setIsOpenDropDown(false)
				setSearchTerm('')
			}

			if (isNotInput) e.preventDefault()
		}

		const handleOnSearchBlur = (e: FocusEvent<HTMLInputElement>): void => {
			onInputBlur?.(e)
			setIsFocused(false)
			setIsOpenDropDown(false)
			setSearchTerm('')
		}

		const handleOnSearchFocus = (e: FocusEvent<HTMLInputElement>): void => {
			onInputFocus?.(e)
			setIsFocused(true)
			if (isOpenDropDownOnFocus) {
				openDropDownAndFocusOption(OptionIndexEnum.FIRST)
			}
		}

		const handleOnSearchChange = (e: FormEvent<HTMLInputElement>): void => {
			onChangeEvtValue.current = true
			onInputChange?.(e.currentTarget.value)
			setSearchTerm(e.currentTarget.value)
			setIsOpenDropDown(true)
		}

		// React Hooks linter rules require that this function be memoized in
		// ...order to be referenced in deps array of callback functions below
		const handleOnMouseDown = useCallback((e: SyntheticEvent<HTMLElement>): void => {
			suppressEvent(e)
			focusInput()
		}, [])

		const handleOnClearMouseDown = useCallback(
			(e: MouseOrTouchEvent<HTMLElement>): void => {
				handleOnMouseDown(e)
				setSelectedOptions([])
			},
			[handleOnMouseDown]
		)

		const handleOnCaretMouseDown = useCallback(
			(e: MouseOrTouchEvent<HTMLElement>): void => {
				if (!isDisabled && !isOpenDropDownOnClick) {
					handleOnMouseDown(e)
					dropDownOpenRef.current
						? setIsOpenDropDown(false)
						: openDropDownAndFocusOption(OptionIndexEnum.FIRST)
				}
			},
			[isDisabled, dropDownOpenRef, isOpenDropDownOnClick, handleOnMouseDown, openDropDownAndFocusOption]
		)
		const isShowClearer = !!isClearable && !isDisabled && hasSelectedOptions
		return (
			<SelectWrapper
				id={id || WRAPPER_CLS}
				onKeyDown={handleOnKeyDown}
				className={WRAPPER_CLS}
				data-testid={WRAPPER_TESTID}
			>
				<SelectContainer
					selectRef={selectContainerRef}
					isError={isError}
					isFocused={isFocused}
					isDisabled={isDisabled}
					onTouchEnd={handleOnControlMouseDown}
					onMouseDown={handleOnControlMouseDown}
					className={CONTAINER_CLS}
					data-testid={CONTAINER_TESTID}
				>
					<ValueLeft hasValue={hasSelectedOptions}>
						<ValueContainer
							hasInput={!!searchTerm}
							onRemoveSelectedOption={handleRemoveSelectedOption}
							selectedOptions={selectedOptions}
							focusedMultiValue={focusedMultiValue}
							// @ts-expect-error: find better solution
							renderOptionLabel={renderOptionLabelFn}
							renderSelectMultiOptions={renderSelectMultiOptions}
							placeholder={placeholder}
						/>
						<SearchInput
							ref={inputSearchRef}
							isOpenDropDown={isOpenDropDown}
							isDisabled={isDisabled}
							isMulti={isMulti}
							isLoading={isLoading}
							isError={isError}
							placeholder={placeholder}
							searchTerm={searchTerm}
							onSearchChange={handleOnSearchChange}
							onSearchFocus={handleOnSearchFocus}
							onSearchBlur={handleOnSearchBlur}
							isReadOnly={!isSearchable || !!focusedMultiValue}
						/>
					</ValueLeft>
					<ValueRight
						isOpenDropDown={isOpenDropDown}
						isLoading={isLoading}
						isShowClearer={isShowClearer}
						isDisabled={isDisabled}
						isError={isError}
						onClearMouseDown={handleOnClearMouseDown}
						onCaretMouseDown={handleOnCaretMouseDown}
					/>
				</SelectContainer>
				<DropDown
					dropDownRef={dropDownRef}
					contentRef={contentRef}
					isMulti={isMulti}
					isOpenDropDown={isOpenDropDown}
					contentOptions={contentOptions}
					searchTerm={searchTerm}
					isShowCheckbox={isShowCheckbox}
					optionValueDecorator={optionValueDecorator}
					onSelectOption={handleSelectOption}
					onMenuMouseDown={handleOnMouseDown}
					renderContentOption={renderContentOption}
					focusedOptionIndex={focusedOption.index}
				/>
			</SelectWrapper>
		)
	}
)

Select.displayName = 'Select'
export default Select
