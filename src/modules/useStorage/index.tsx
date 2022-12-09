import React from 'react'
import { useLocalStorage } from '../../lib'

export default () => {

	const [state, updateState] = useLocalStorage<number>('__storage__ruihuag', { defaultValue: 123 })

	return <div>
		<div>
			<input
				value={state || undefined}
				onChange={(e) => {
					updateState(Number(e.target.value))
				}} />
			<button
				onClick={() => updateState(state + 1)}
			>
				add
			</button>
		</div>
		<div>
			Username:{JSON.stringify(state)}
		</div>
	</div>
}