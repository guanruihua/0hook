import React from 'react'
import { isEmpty, isString } from 'asura-eye'

export interface UseStorageOption {
  storage?: Storage
}
export type UseStorageState = readonly [
  value: string,
  setValue: (value: string) => void,
]

export function useStorage(
  key: string,
  initialValue?: string,
  options: UseStorageOption = {},
): UseStorageState {
  const { storage = sessionStorage } = options
  const getDefaultValue = () => {
    try {
      return isEmpty(storage.getItem(key)) ? initialValue : storage.getItem(key)
    } catch (error) {
      return null
    }
  }

  const [value, _setValue] = React.useState<string | null | any>(
    getDefaultValue() || '',
  )

  const setValue = (value: string) => {
    _setValue(value)
    if (isString(value)) {
      storage.setItem(key, value)
    } else {
      storage.setItem(key, JSON.stringify(value))
    }
  }

  React.useEffect(() => {
    const tmpValue = storage.getItem(key)
    if (isEmpty(tmpValue)) return
    if (tmpValue !== value) {
      setValue(tmpValue as string)
    }
  }, [key, setValue, storage])

  return [value, setValue] as const
}

export const useLocalStorage = (key: string, initialValue?: string) =>
  useStorage(key, initialValue, { storage: localStorage })

export const useSessionStorage = (key: string, initialValue?: string) =>
  useStorage(key, initialValue, { storage: sessionStorage })
