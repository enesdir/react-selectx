import { Fragment, useCallback, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'

import { Select } from '../src'

const meta: Meta<typeof Select> = {
	title: 'Realworld/PokemanApi',
	component: Select,
}
export default meta

type Story = StoryObj<typeof Select>

export const Character: Story = {
	args: {
		options: [],
		isObject: true,
		isMulti: true,
		displayValue: 'name',
		imgValue: 'image',
		descriptionValue: 'status',
		isShowCheckbox: true,
	},
	render: function Render(args) {
		const [{ options, isLoading, isError }, updateArgs] = useArgs<{
			isError: boolean
			isLoading: boolean
			options: []
		}>()
		const [selected, setSelected] = useState([])
		const handleQueryChange = useCallback(async (searchQuery: string) => {
			if (searchQuery) {
				updateArgs({ isLoading: true, isError: false })

				try {
					// Simulating API call
					const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`)
					const data = await response.json()
					// setSearchResults(data.results)
					updateArgs({ isLoading: false, options: data.results, isError: false })
				} catch (error) {
					// Handle error

					updateArgs({ isLoading: false, isError: true })
				}
			} else {
				updateArgs({ options: [] })
			}
		}, [])

		const highlightSearchInput = (label: string, query: string) => {
			if (!query || !label.toLowerCase().includes(query.toLowerCase())) {
				return label
			}

			const indexOfMatch = label.toLowerCase().indexOf(query.toLowerCase())
			const endOfMatch = indexOfMatch + query.length

			return (
				<span>
					{label.substring(0, indexOfMatch)}
					<b>{label.substring(indexOfMatch, endOfMatch)}</b>
					{label.substring(endOfMatch)}
				</span>
			)
		}

		return (
			<Fragment>
				<h1>Select Your Characters</h1>
				<br />
				<Select
					{...args}
					options={options}
					isLoading={isLoading}
					isError={isError}
					onSelect={(items) => {
						action('onSelect')(items)
						setSelected(items)
					}}
					onRemove={(items) => {
						action('onRemove')(items)
						setSelected(items)
					}}
					onSearch={handleQueryChange}
					optionValueDecorator={highlightSearchInput}
				/>
				<br />
				<pre>Selected Characters </pre>
				<ul>
					{selected.map((e, i) => {
						return <li key={i}>{JSON.stringify(e)}</li>
					})}
				</ul>
			</Fragment>
		)
	},
}
