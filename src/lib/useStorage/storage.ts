// import { useState, useEffect } from "react"

// export type UseState<T> = [T, (value: T) => void]

// export interface StorageOption<T> {
// 	defaultValue?: T
// 	/**
// 	 * @description 是否需要序列号处理
// 	 * @default false
// 	 */
// 	parse?: boolean
// 	/**
// 	 * @description 自定义序列化
// 	 */
// 	serializer?: (value: T) => string
// 	/**
// 	 * @description 自定义饭序列化
// 	 */
// 	deserializer?: (value: string) => T
// 	/**
// 	 * @default localStorage
// 	 */
// 	storage?: Storage
// }

// export function useStorage<T>(key: string, options?: StorageOption<T>): UseState<T> {
// 	const { defaultValue, ...restOptions } = options || {}
// 	const loVal = getStorage<T>(key, options)
// 	useEffect(() => {
// 		getStorage<T>(key, { defaultValue, ...restOptions })
// 	}, [])

// 	const [val, _setVal] = useState<T>(loVal)

// 	function setVal(newVal: T): void {
// 		_setVal(newVal)
// 		setStorage<T>(key, { value: newVal, ...restOptions })
// 	}

// 	return [val, setVal]
// }

// export interface GetStorageOption<T> extends StorageOption<T> { }

// export function getStorage<T>(key: string, options?: GetStorageOption<T>): T {
// 	const { defaultValue, parse = true, storage = localStorage } = options || {}
// 	if (storage.getItem(key) === null) {
// 		if (parse) {
// 			storage.setItem(key, JSON.stringify(defaultValue))
// 		} else if (typeof defaultValue === 'string')
// 			storage.setItem(key, defaultValue)
// 	}
// 	try {
// 		const result = localStorage.getItem(key)
// 		if (result === null) return defaultValue
// 		if (parse) return JSON.parse(result || JSON.stringify(defaultValue))
// 		return result as unknown as T
// 	} catch {
// 		return defaultValue
// 	}
// }


// export interface SetStorageOption<T> extends Omit<StorageOption<T>, 'defaultValue'> {
// 	value: T
// }

// export function setStorage<T>(key: string, options?: SetStorageOption<T>): boolean {
// 	const { value, parse = true, storage = localStorage } = options || {}
// 	try {

// 		if (parse) {
// 			storage.setItem(key, JSON.stringify(value))
// 			return true
// 		} else {
// 			if (typeof value === 'string') {
// 				storage.setItem(key, value)
// 				return true
// 			}
// 		}
// 		return false
// 	} catch {
// 		return false
// 	}
// }