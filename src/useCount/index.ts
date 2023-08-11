import { useState } from 'react'
import { isEmpty, isNumber } from 'asura-eye'

export type Options = {
	/**
	 * @default 0
	 */
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

/**
 * @title useCount 
 * @description 计数
 * @param initialState {number=0}
 * @param options {min?:number,max?:number}
 * @returns [number, (value?:number)=>void]
 */
export function useCount(initialState = 0, options: Options = {})
	: readonly [number, (value?: number) => void] {

	const [state, setStateTemp] = useState<number>(getTargetValue(initialState, options))

	const setState = (value: number) => {
		if (isEmpty(value)) {
			const result = getTargetValue(state + 1, options)
			if (result !== state) setStateTemp(result)
			return;
		}
		setStateTemp(getTargetValue(value, options))
		return;
	}

	return [state, setState] as const
}