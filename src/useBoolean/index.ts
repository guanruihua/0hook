import { useState, useCallback } from 'react';
import { isBoolean } from 'asura-eye';

/**
 * @title useBoolean
 * @description 布尔值切换
 * @param initialState {boolean}
 * @returns [boolean, ()=>void]
 */
export function useBoolean(initialState = true): readonly [boolean, (value?: boolean) => void] {
	const [state, setState] = useState<boolean>(initialState)

	return [
		state,
		useCallback((value) => setState(state => isBoolean(value) ? value : !state), [])
	] as const
}