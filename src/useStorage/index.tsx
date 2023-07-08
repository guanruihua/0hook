import React from 'react'
import { isEmpty } from 'asura-eye'

export interface UseStorageOption {
	storage?: Storage
}

export function useStorage(
	key: string,
	initialValue?: string | null,
	options: UseStorageOption = {})
	: readonly [
		value: string | null,
		setValue: (value: string) => void
	] {
	const { storage = sessionStorage } = options
	const defaultValue = (isEmpty(initialValue) ? storage.getItem(key) : initialValue)
	const [value, _setValue] = React.useState<string | null>(defaultValue)

	const setValue = (value: string) => {
		_setValue(value)
		storage.setItem(key, value)
	}

	React.useEffect(() => {
		const tmpValue = storage.getItem(key)
		if (isEmpty(tmpValue)) return
		if (tmpValue !== value) {
			setValue(tmpValue)
		}
	}, [key, setValue, storage])

	return [value, setValue]
}

export const useLocalStorage = (key: string, initialValue?: string | null) => useStorage(key, initialValue, { storage: localStorage })


export const useSessionStorage = (key: string, initialValue?: string | null) => useStorage(key, initialValue, { storage: sessionStorage })
