import React from 'react'
import { useInterval } from '..'

export default () => {
  const [state, setState] = React.useState(12)

  const timer = useInterval(() => {
    // 这里原本要使用 setState(v=>v+1) 才会正常
    setState(state + 1)
  }, 1000)

  return (
    <div>
      <div> {state} </div>
      <button
        onClick={() => {
          timer && clearInterval(timer)
        }}
      >
        clearInterval
      </button>
    </div>
  )
}
