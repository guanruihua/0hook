import { useState } from 'react'
import { isFunction } from 'abandonjs'

export function useSetState<T extends Record<string, any>>(initialState: T = {} as T)
  : [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] {

  const [state, setState] = useState<T>(initialState)

  return [
    state,
    (patch: Partial<T> | ((prevState: T) => Partial<T>)): void => {
      if (isFunction(patch)) {
        setState({ ...state, ...patch(state) })
      } else {
        setState({ ...state, ...patch })
      }
    }
  ]

}
