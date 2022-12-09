import React from 'react'
import { useSetState } from '..'

export default () => {
	const [state, updateState] = useSetState({
		name: 'ruihuag',
		age: '24',
		sex: 'man'
	})

	return <div>
		<div>
			<button
				onClick={() => updateState({ name: 'RUIHUAG', 'age': '999' })}>
				update name & age
			</button>
		</div>
		<div>
			Username:{JSON.stringify(state)}
		</div>
	</div>
}

// import React, { useState } from "react"
// import { flushSync } from 'react-dom'

// export default function Demo() {
// 	console.log('App组件渲染了！');
// 	const [count1, setCount1] = useState(0);
// 	const [count2, setCount2] = useState(0);
// 	return (
// 		<div>
// 			<button
// 				onClick={() => {
// 					flushSync(() => {
// 						setCount1(count => count + 1);
// 						// setCount2(count => count + 1);
// 					});
// 					flushSync(() => {
// 						setCount2(count => count + 1);
// 					});
// 				}}
// 			>
// 				add
// 			</button>
// 			<div>count1： {count1}</div>
// 			<div>count2： {count2}</div>
// 		</div>
// 	);

// }

