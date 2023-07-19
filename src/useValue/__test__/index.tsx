import React from 'react'
import { useValue } from '..'

export default () => {
	const [value, setValue] = useValue([1, 2, 3])
	const [value2, setValue2] = React.useState([1, 2, 3])

	console.log('渲染...')

	return <div>
		<div>
			{value.join()}
		</div>
		<button onClick={() => {
			console.log('click')
			setValue([1, 2, 3])
		}}>
			update
		</button>
		<button onClick={() => {
			console.log('click')
			setValue([1, 2, 3], true)
		}}>
			update(force)
		</button>
		<div>
			{value2.join()}
		</div>
		<button onClick={() => {
			console.log('click2')
			setValue2([1, 2, 3])
		}}>
			update
		</button>
	</div>
}

