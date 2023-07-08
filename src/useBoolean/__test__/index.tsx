import React from "react"
import { stringify } from 'abandonjs'
import { useBoolean } from '..'

export default function Demo() {
	const [bool, setBool] = useBoolean(true)
	return (
		<div>
			<button
				onClick={() => {
					setBool()
				}}
			>
				Toggle
			</button>
			<button onClick={()=>{
				setBool(true)
			}}>
				set true
			</button>
			<div>value: {stringify(bool)}</div>
		</div>
	);
}