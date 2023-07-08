import React from 'react'
import { useCount } from '..'

export default () => {
	const [state, updateState] = useCount(12, { min: 10, max: 14 })

	return <div>
		<div>
			<button
				onClick={() => updateState(state + 1)}>
				add Count
			</button>
		</div>
		<div>
			<button
				onClick={() => updateState()}>
				add Count(No Params)
			</button>
		</div>
		<div>
			Count:{JSON.stringify(state)}
		</div>
	</div>
}

