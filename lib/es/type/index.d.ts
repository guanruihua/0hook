import { ObjectType } from 'abandonjs';

declare function useSetState<T extends ObjectType>(initialState?: T): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void];

declare type Options = {
    min?: number;
    max?: number;
};
declare function useCount(initialState: number, options?: Options): readonly [number, (value: number) => void];

declare function useBoolean(initialState?: boolean): [boolean, () => void];

declare type ObjectValue<UseObjectType = ObjectType> = UseObjectType[keyof UseObjectType];
interface Actions$1<ObjectValueType = ObjectType> {
    setObject: (record: ObjectValueType) => void;
    set: (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force?: boolean) => void;
    remove: (key: keyof ObjectValueType) => void;
    reset: (force?: boolean) => void;
}
declare function useObject<ObjectValueType = ObjectType>(initialValue?: ObjectValueType): [ObjectValueType, Actions$1<ObjectValueType>];

declare type UseMapKey = string | number;
interface Actions<Value> {
    set: (key: UseMapKey, value: Value, force?: boolean) => void;
    setAll: (newMap: Iterable<readonly [UseMapKey, Value]>, force?: boolean) => void;
    remove: (key: UseMapKey) => void;
    reset: (force?: boolean) => void;
    get: (key: UseMapKey) => Value | undefined;
}
declare function useMap<Value>(initialValue?: Iterable<readonly [UseMapKey, Value]>): [Map<UseMapKey, Value>, Actions<Value>];

export { Options, useBoolean, useCount, useMap, useObject, useSetState };
