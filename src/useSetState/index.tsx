import { useState, useEffect } from 'react'
import { ObjectType } from '0type'
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
  (
    patch: Partial<T> | ((prevState: Partial<T>) => Partial<T>),
    cover?: boolean,
  ) => void,
  (props?: (string | number)[]) => void,
]

/**
 * @title useSetState<T>
 * @description 类似 setState 的使用
 * @param {T} initialState 默认值
 * @param {string} [cacheKey] 缓存索引
 * @param  {Storage}[storage=localStorage] 缓存类型
 * @returns {UseSetState}
 */
export function useSetState<T extends ObjectType>(
  initialState: T = {} as T,
  cacheKey?: string,
  storage: Storage = localStorage,
): UseSetState<T> {
  const [state, _setState] = useState<Partial<T>>(initialState)

  const setState = (newVal: T | Partial<T>) => {
    _setState(newVal)
    if (!cacheKey) return
    try {
      storage.setItem(cacheKey, JSON.stringify(newVal))
    } catch (error) {
      console.warn(error)
      return
    }
  }

  useEffect(() => {
    if (!cacheKey) return
    try {
      const cacheStr = storage.getItem(cacheKey)
      if (!cacheStr || cacheStr === '{}') return
      setState(JSON.parse(cacheStr))
    } catch (error) {
      return
    }
  }, [cacheKey, storage])

  return [
    state,
    (
      patch: Partial<T> | ((prevState: Partial<T>) => Partial<T>),
      cover = false,
    ): void => {
      const coverState: Partial<T> =
        typeof patch === 'function' ? patch(state) : patch
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
    },
  ] as const
}
