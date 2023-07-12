import React from "react"

/**
 * @title useSetTimeout
 * @description useEffect 和 setTimeout 的使用, 主要解决React this指向问题
 * @param callback {()=>void}
 * @param delay {number|null}
 */
export function useSetTimeout(callback: () => void, delay: number | null) {
	const savedCallback: any = React.useRef(() => { return; })

	savedCallback.current = callback

	React.useEffect(() => {
		if (delay !== null) {
			const handler = () => savedCallback.current()
			const timer = setTimeout(handler, delay)
			return () => clearInterval(timer)
		}
	}, [delay])
}