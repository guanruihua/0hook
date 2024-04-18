import React from 'react'
import { useDebounceEffect } from '..'

export default () => {
  const [state, setState] = React.useState(12)

  useDebounceEffect(
    () => {
      setState(state + 1)
      return () => {
        console.log('close page')
      }
    },
    1000,
    []
  )

  return (
    <div>
      <div> {state} </div>
    </div>
  )
}
