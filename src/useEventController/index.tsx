import React from 'react'

export function useEventController() {
  const controllerRef = React.useRef<AbortController | null>(null)

  React.useEffect(() => {
    controllerRef.current = new AbortController()

    return () => {
      controllerRef.current?.abort()
    }
  }, [])

  const addEventListener = (
    target: any,
    event: keyof WindowEventMap,
    handler: (e: Event) => void,
    options?: AddEventListenerOptions,
  ) => {
    if (!controllerRef.current) return

    const element = target?.current || target
    if (!element) return

    element.addEventListener(event, handler, {
      signal: controllerRef.current?.signal,
      ...options,
    })
  }

  return { addEventListener }
}
