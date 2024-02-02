import React from 'react'

/**
 * @title useInterval
 * @description useEffect 和 setInterval 的使用, 主要解决React this指向问题
 * @param callback {()=>void}
 * @param delay {number|null}
 * @returns {NodeJS.Timer|null}
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback: any = React.useRef(() => {
    return
  })

  savedCallback.current = callback
  const [myTimer, setMyTimer] = React.useState<NodeJS.Timer | null>(null)
  
  React.useEffect(() => {
    if (delay !== null) {
      const handler = () => savedCallback.current()
      const timer = setInterval(handler, delay)
      setMyTimer(timer)
      return () => timer && clearInterval(timer)
    }
  }, [delay])

  return myTimer
}
