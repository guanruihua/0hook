import React from 'react'
import { useLocalStorage } from '..'

export default () => {

	const [state, updateState] = useLocalStorage('__storage__tmp_value', '123')

	return <div>
		<div>
			<input
				value={state || undefined}
				onChange={(e) => {
					updateState(e.target.value)
				}} />
			<button
				onClick={() => updateState('345')}
			>
				set value = 345
			</button>
		</div>
		<div>
			value:{JSON.stringify(state)}
		</div>
	</div>
}