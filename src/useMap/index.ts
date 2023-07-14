import { useState } from 'react'
import { isEqual } from 'abandonjs'

export interface UseMapAction<Key = string, Value = any> {
	set: (key: Key, value: Value, force?: boolean) => void
	setAll: (newMap: Iterable<readonly [Key, Value]>, force?: boolean) => void
	remove: (key: Key) => void
	reset: (force?: boolean) => void
	get: (key: Key) => Value | undefined
	keys: () => Key[]
}

/**
 * @title useMap<Key,Value>
 * @description Map数据管理
 * @param initialValue {Map}
 * @returns {[Map, Actions]}
 */
export function useMap<Key = string, Value = any>(initialValue?: Iterable<readonly [Key, Value]>)
	: readonly [Map<Key, Value>, UseMapAction<Key, Value>] {

	const getInitialValue = () => initialValue === undefined ? new Map() : new Map(initialValue)

	const [map, setMap] = useState<Map<Key, Value>>(() => getInitialValue())

	const set = (key: Key, value: Value, force = false) => {
		if (isEqual(map.get(key), value) && !force) {
			return
		}
		setMap((prev) => {
			const temp = new Map(prev)
			temp.set(key, value)
			return temp
		})
	}

	const setAll = (newMap: Iterable<readonly [Key, Value]>) => {
		setMap(new Map(newMap))
	}

	const remove = (key: Key) => {
		setMap((prev) => {
			const temp = new Map(prev)
			temp.delete(key)
			return temp
		})
	}

	const reset = () => setMap(getInitialValue())

	const get = (key: Key) => map.get(key)
	const keys = () => Array.from(map.keys())

	return [map, {
		keys,
		set,
		setAll,
		remove,
		reset,
		get,
	}] as const
}