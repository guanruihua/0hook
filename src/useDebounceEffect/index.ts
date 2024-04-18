import { useEffect, DependencyList } from 'react'

// export interface UseDebounceEffect

type Result = void | Promise<void>

export function useDebounceEffect(
  fn: () => Result | (() => Result),
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    let cb: null | (() => Result) = null
    const t = setTimeout(async () => {
      const result = fn && (await fn())
      if (result) cb = result
    }, waitTime)

    return () => {
      clearTimeout(t)
      cb && cb()
    }
  }, deps)
}
