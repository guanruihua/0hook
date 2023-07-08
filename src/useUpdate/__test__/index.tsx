import React from 'react'
import { useUpdate } from '..'

export default () => {
	const update = useUpdate()

	console.log('渲染...')

	return <div>
		<button onClick={update}>
			update
		</button>
	</div>
}

