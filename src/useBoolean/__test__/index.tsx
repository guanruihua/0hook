import React, { useState } from "react"
import { stringify } from 'abandonjs'
import { useBoolean } from '..'

export default function Demo() {
	console.log('App组件渲染了！');
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
			<div>value: {stringify(bool)}</div>
		</div>
	);
}