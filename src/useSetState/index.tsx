import { useState } from 'react'
import { ObjectType } from 'abandonjs'
import { isEffectArray, isEmpty } from 'asura-eye'

/**
 * @title UseSetState<T>
 * @description 类似 setState 的使用
 * @param 0 state {T} 状态
 * @param 1 setState {T} 修改状态
 * @param 2 resetState {T} 恢复默认状态
 */
export type UseSetState<T extends ObjectType> = readonly [
	T,
	(patch: Partial<T> | ((prevState: T) => Partial<T>)) => void,
	(props?: string[]) => void,
]

/**
 * @title useSetState<T> 
 * @description 类似 setState 的使用
 * @param initialState {T} 默认值
 * @returns {UseSetState}
 */
export function useSetState<T extends ObjectType>(initialState: T = {} as T)
	: UseSetState<T> {

	const [state, setState] = useState<T>(initialState)
	return [
		state,
		(patch: Partial<T> | ((prevState: T) => Partial<T>)): void => {
			if (typeof patch === 'function') {
				setState({ ...state, ...patch(state) })
			} else {
				setState({ ...state, ...patch })
			}
		},
		(props?: string[]): void => {
			if (isEffectArray(props)) {
				const newState: Partial<T> = { ...state }
				props.forEach((prop) => {
					if (isEmpty(prop)) return;
					(newState as ObjectType)[prop] = undefined
				})
				setState(newState as T)
				return
			}
			setState(initialState)
		}
	] as const
}
