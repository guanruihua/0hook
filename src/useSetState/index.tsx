import { useState } from 'react'
import { ObjectType } from 'abandonjs'
import { isEffectArray, isNumber, isString } from 'asura-eye'

/**
 * @title UseSetState<T>
 * @description 类似 setState 的使用
 * @param 0 state {T} 状态
 * @param 1 setState {T} 修改状态
 * @param 2 resetState {T} 恢复默认状态
 */
export type UseSetState<T extends ObjectType> = readonly [
	Partial<T>,
	(patch: Partial<T> | ((prevState: Partial<T>) => Partial<T>), cover?: boolean) => void,
	(props?: (string | number)[]) => void,
]

/**
 * @title useSetState<T> 
 * @description 类似 setState 的使用
 * @param initialState {T} 默认值
 * @returns {UseSetState}
 */
export function useSetState<T extends ObjectType>(initialState: T = {} as T)
	: UseSetState<T> {

	const [state, setState] = useState<Partial<T>>(initialState)
	return [
		state,
		(patch: Partial<T> | ((prevState: Partial<T>) => Partial<T>), cover = false): void => {
			const coverState: Partial<T> = typeof patch === 'function' ? patch(state) : patch
			if (cover) {
				setState(coverState)
			} else {
				setState({ ...state, ...coverState })
			}
		},
		(props?: (string | number)[]): void => {
			if (isEffectArray(props)) {
				const newState: Partial<T> = { ...state }
				props.forEach((prop) => {
					if (isString(prop) || isNumber(prop))
						(newState as ObjectType)[prop] = initialState[prop]
				})
				setState(newState as T)
				return
			}
			setState(initialState)
		}
	] as const
}
