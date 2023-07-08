import React from "react"
import { useMap } from '..'
let num = 0
export default function () {
	num++;
	const [state, action] = useMap<string>([
		['a', '123'],
		['b', '456'],
		['c', '789']
	])
	return <div>
		ussMap(render Count: {num})
		<div>{state.get('a')}</div>
		<div>{action.get('a')}</div>
		<button onClick={() => {
			action.set('a', '111')
		}}>update a</button>
		<div>{state.get('b')}</div>
		<button onClick={() => {
			action.set('b', '222', true)
		}}>update b(force)</button>
		<div>{state.get('c')}</div>
	</div>
}