import React from "react"
import { stringify } from 'abandonjs'
import { useObject } from '..'

let num = 0

interface ObjType {
	a: string
	b: number
	c: boolean
}
export default function () {
	num++;
	const [state, {
		set, remove, reset
	}] = useObject<ObjType>({
		a: 'aaa',
		b: 222,
		c: true
	})

	return <div>
		<div className="title">
			useObject
		</div>
		<div className="state">
			<div>state: {stringify(state)}</div>
			<div>a: {state.a}</div>
			<div>b: {state.b}</div>
			<div>c: {stringify(state.c)}</div>
		</div>
		<div className="action">
			<button onClick={() => { set('a', 'a2222') }}>set a</button>
			<button onClick={() => { set('a', 'a2222', true) }}>set a(force)</button>
			<button onClick={() => { reset() }}>reset</button>
			<button onClick={() => { remove('a') }}>remove a</button>
		</div>
		<div className="extra">
			<div>Render Count: {num}</div>
		</div>
	</div>
}
