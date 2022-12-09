import { useState, useCallback } from 'react';

export function useBoolean(initialState = true): [boolean, () => void] {
	const [state, setState] = useState<boolean>(initialState)

	return [
		state,
		useCallback(() => setState(state => !state), [])
	]
}