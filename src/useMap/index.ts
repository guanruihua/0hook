import { useState } from 'react'
import { isEqual } from 'abandonjs'

type UseMapKey = string | number

interface Actions<Value> {
	set: (key: UseMapKey, value: Value, force?: boolean) => void
	setAll: (newMap: Iterable<readonly [UseMapKey, Value]>, force?: boolean) => void
	remove: (key: UseMapKey) => void
	reset: (force?: boolean) => void
	get: (key: UseMapKey) => Value | undefined
}

export function useMap<Value>(initialValue?: Iterable<readonly [UseMapKey, Value]>): [Map<UseMapKey, Value>, Actions<Value>] {

	const getInitialValue = () => initialValue === undefined ? new Map() : new Map(initialValue)

	const [map, setMap] = useState<Map<UseMapKey, Value>>(() => getInitialValue())

	const set = (key: UseMapKey, value: Value, force = false) => {
		if (isEqual(map.get(key), value) && !force) {
			return
		}
		setMap((prev) => {
			const temp = new Map(prev)
			temp.set(key, value)
			return temp
		})
	}

	const setAll = (newMap: Iterable<readonly [UseMapKey, Value]>) => {
		setMap(new Map(newMap))
	}

	const remove = (key: UseMapKey) => {
		setMap((prev) => {
			const temp = new Map(prev)
			temp.delete(key)
			return temp
		})
	}

	const reset = () => setMap(getInitialValue())

	const get = (key: UseMapKey) => map.get(key)

	return [map, {
		set,
		setAll,
		remove,
		reset,
		get,
	}]
}