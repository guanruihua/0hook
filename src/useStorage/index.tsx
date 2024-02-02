import React from 'react'
import { isEmpty } from 'asura-eye'

export interface UseStorageOption {
  storage?: Storage
}
export type UseStorageState<T=string> = readonly [value: T | null, setValue: (value: T) => void]

export function useStorage<T = string>(
  key: string,
  initialValue?: T | null,
  options: UseStorageOption = {}
): UseStorageState<T> {
  const { storage = sessionStorage } = options
  const getDefaultValue = () =>
    isEmpty(storage.getItem(key)) ? initialValue : storage.getItem(key)

  const [value, _setValue] = React.useState<T | null | any>(getDefaultValue() || null)

  const setValue = (value: T) => {
    _setValue(value)
    // storage.setItem(key, value)
  }

  React.useEffect(() => {
    const tmpValue = storage.getItem(key)
    if (isEmpty(tmpValue)) return
    if (tmpValue !== value) {
      // setValue(tmpValue)
    }
  }, [key, setValue, storage])

  return [value, setValue]
}

export const useLocalStorage = (key: string, initialValue?: string | null) =>
  useStorage(key, initialValue, { storage: localStorage })

export const useSessionStorage = (key: string, initialValue?: string | null) =>
  useStorage(key, initialValue, { storage: sessionStorage })
