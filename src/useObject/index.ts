import { useState } from 'react'
import { equal, ObjectType } from 'abandonjs'

type ObjectValue<UseObjectType = ObjectType> = UseObjectType[keyof UseObjectType]

export interface UseObjectActions<ObjectValueType = ObjectType> {
	/**
	 * @description 直接替换掉管理的值
	 * @param record {object}
	 */
	setObject: (record: ObjectValueType) => void
	/**
	 * @description 设置值
	 * @param key {string} 属性名
	 * @param value {unknown} 属性值
	 * @param force {boolean=false} false:若和当前值相等则不执行
	 */
	set: (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force?: boolean) => void
	/**
	 * @description 删除属性
	 * @param key {string} 删除的属性
	 */
	remove: (key: keyof ObjectValueType) => void
	/**
	 * @description 重置
	 * @param force {boolean=false} false:若和当前值相等则不执行
	 */
	reset: (force?: boolean) => void
}

/**
 * @title useObject<Object>
 * @description 管理对象状态
 * @param initialValue {?Object}
 * @returns [object, Actions<Object>]
 */
export function useObject<ObjectValueType = ObjectType>(initialValue?: ObjectValueType): readonly [ObjectValueType, UseObjectActions<ObjectValueType>] {

	const getInitialValue = () => initialValue || {} as ObjectValueType

	const [state, setState] = useState<ObjectValueType>(() => getInitialValue())

	const setObject = (record: ObjectValueType) => {
		if (!equal(record, state)) setState(record)
	}

	const set = (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force = false) => {
		if (!force && equal(value, state[key])) return;
		const tempState = { ...state }
		tempState[key] = value
		setState(tempState)
	}

	const remove = (key: keyof ObjectValueType) => {
		if (Object.keys(state as ObjectType).includes(key as string)) {
			const tempState = { ...state }
			delete tempState[key]
			setState(tempState)
		}
	}

	const reset = (force = false) => {
		if (!force && equal(state, getInitialValue())) return;
		setState(getInitialValue())
	}

	return [state,
		{
			set,
			remove,
			reset,
			setObject
		}
	] as const
}