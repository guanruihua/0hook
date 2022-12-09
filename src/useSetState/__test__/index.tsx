import React, { useState } from "react"
import { flushSync } from 'react-dom'

export default function Demo() {
	console.log('App组件渲染了！');
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);
	return (
		<button
			onClick={() => {
				flushSync(() => {
					setCount1(count => count + 1);
					// setCount2(count => count + 1);
				});
				flushSync(() => {
					setCount2(count => count + 1);
				});
			}}
		>
			<div>count1： {count1}</div>
			<div>count2： {count2}</div>
		</button>
	);

}