import { useState } from 'react'
import { isNumber } from 'abandonjs'

export type Options = {
	min?: number,
	max?: number
}

function getTargetValue(val: number, options: Options = {}) {
	const { min = 0, max = Infinity } = options;
	let target = val;
	if (isNumber(max)) {
		target = Math.min(max, target)
	}
	if (isNumber(min)) {
		target = Math.max(min, target)
	}
	return target;
}

export function useCount(initialState: number, options: Options = {})
	: readonly [number, (value: number) => void] {

	const [state, setStateTemp] = useState<number>(getTargetValue(initialState, options))

	const setState = (value: number) => {
		const result = getTargetValue(value, options)
		if (result === state) return;
		setStateTemp(result)
	}

	return [state, setState] as const
}