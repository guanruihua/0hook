import { useState } from 'react'
import { equal, ObjectType } from 'abandonjs'

type ObjectValue<UseObjectType = ObjectType> = UseObjectType[keyof UseObjectType]

interface Actions<ObjectValueType = ObjectType> {
	setObject: (record: ObjectValueType) => void
	set: (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force?: boolean) => void
	remove: (key: keyof ObjectValueType) => void
	reset: (force?: boolean) => void
}

/**
 * @title useObject<Object>
 * @description 管理对象状态
 * @param initialValue {?Object}
 * @returns [object, Actions<Object>]
 */
export function useObject<ObjectValueType = ObjectType>(initialValue?: ObjectValueType): readonly [ObjectValueType, Actions<ObjectValueType>] {

	const getInitialValue = () => initialValue || {} as ObjectValueType

	const [state, setState] = useState<ObjectValueType>(() => getInitialValue())

	const setObject = (record: ObjectValueType) => {
		if (equal(record, state)) return;
		setState(record)
	}

	const set = (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force = false) => {
		if (!force && equal(value, state[key])) return;
		const tempState = { ...state }
		tempState[key] = value
		setState(tempState)
	}

	const remove = (key: keyof ObjectValueType) => {
		if (!Object.keys(state as ObjectType).includes(key as string)) return;
		const tempState = { ...state }
		delete tempState[key]
		setState(tempState)
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