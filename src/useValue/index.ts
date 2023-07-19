import { toString } from 'abandonjs'
import React from 'react'

export type UseValue<T> = readonly [T, (value: T, force?: boolean) => void]

export function useValue<T>(value: T, callback?: (value: T) => void): UseValue<T> {
	const [state, setState] = React.useState<T>(value)

	return [
		state,
		(value: T, force = false) => {
			if (force) {
				callback && callback(value)
				setState(value)
				return;
			}
			if (toString(value) === toString(state)) return;
			callback && callback(value)
			setState(value)
		}
	] as const


}