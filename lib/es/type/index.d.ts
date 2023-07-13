import { ObjectType } from 'abandonjs';

declare function useBoolean(initialState?: boolean): readonly [boolean, (value?: boolean) => void];

declare type Options = {
    min?: number;
    max?: number;
};
declare function useCount(initialState: number, options?: Options): readonly [number, (value?: number) => void];

declare type UseMapKey = string | number;
interface Actions$1<Value> {
    set: (key: UseMapKey, value: Value, force?: boolean) => void;
    setAll: (newMap: Iterable<readonly [UseMapKey, Value]>, force?: boolean) => void;
    remove: (key: UseMapKey) => void;
    reset: (force?: boolean) => void;
    get: (key: UseMapKey) => Value | undefined;
}
declare function useMap<Value>(initialValue?: Iterable<readonly [UseMapKey, Value]>): readonly [Map<UseMapKey, Value>, Actions$1<Value>];

declare type ObjectValue<UseObjectType = ObjectType> = UseObjectType[keyof UseObjectType];
interface Actions<ObjectValueType = ObjectType> {
    setObject: (record: ObjectValueType) => void;
    set: (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force?: boolean) => void;
    remove: (key: keyof ObjectValueType) => void;
    reset: (force?: boolean) => void;
}
declare function useObject<ObjectValueType = ObjectType>(initialValue?: ObjectValueType): readonly [ObjectValueType, Actions<ObjectValueType>];

declare type UseSetState<T extends ObjectType> = readonly [
    T,
    (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void,
    (props?: string[]) => void
];
declare function useSetState<T extends ObjectType>(initialState?: T): UseSetState<T>;

interface UseStorageOption {
    storage?: Storage;
}
declare function useStorage(key: string, initialValue?: string | null, options?: UseStorageOption): readonly [
    value: string | null,
    setValue: (value: string) => void
];
declare const useLocalStorage: (key: string, initialValue?: string | null) => readonly [value: string | null, setValue: (value: string) => void];
declare const useSessionStorage: (key: string, initialValue?: string | null) => readonly [value: string | null, setValue: (value: string) => void];

declare const useUpdate: () => () => void;

declare function useInterval(callback: () => void, delay: number | null): void;

declare function useSetTimeout(callback: () => void, delay: number | null): void;

export { Options, UseSetState, UseStorageOption, useBoolean, useCount, useInterval, useLocalStorage, useMap, useObject, useSessionStorage, useSetState, useSetTimeout, useStorage, useUpdate };
