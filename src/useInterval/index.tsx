import React from "react"

/**
 * @title useInterval
 * @description useEffect 和 setInterval 的使用, 主要解决React this指向问题
 * @param callback {()=>void}
 * @param delay {number|null}
 */
export function useInterval(callback: () => void, delay: number | null) {
	const savedCallback: any = React.useRef(() => { return; })

	savedCallback.current = callback

	React.useEffect(() => {
		if (delay !== null) {
			const handler = () => savedCallback.current()
			const timer = setInterval(handler, delay)
			return () => clearInterval(timer)
		}
	}, [delay])
}