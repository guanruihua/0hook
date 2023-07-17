import { ObjectType } from 'abandonjs';

declare function useBoolean(initialState?: boolean): readonly [boolean, (value?: boolean) => void];

declare type Options = {
    min?: number;
    max?: number;
};
declare function useCount(initialState: number, options?: Options): readonly [number, (value?: number) => void];

interface UseMapAction<Key = string, Value = any> {
    set: (key: Key, value: Value, force?: boolean) => void;
    setAll: (newMap: Iterable<readonly [Key, Value]>, force?: boolean) => void;
    remove: (key: Key) => void;
    reset: (force?: boolean) => void;
    get: (key: Key) => Value | undefined;
    keys: () => Key[];
}
declare function useMap<Key = string, Value = any>(initialValue?: Iterable<readonly [Key, Value]>): readonly [Map<Key, Value>, UseMapAction<Key, Value>];

declare type ObjectValue<UseObjectType = ObjectType> = UseObjectType[keyof UseObjectType];
interface Actions<ObjectValueType = ObjectType> {
    setObject: (record: ObjectValueType) => void;
    set: (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force?: boolean) => void;
    remove: (key: keyof ObjectValueType) => void;
    reset: (force?: boolean) => void;
}
declare function useObject<ObjectValueType = ObjectType>(initialValue?: ObjectValueType): readonly [ObjectValueType, Actions<ObjectValueType>];

declare type UseSetState<T extends ObjectType> = readonly [
    Partial<T>,
    (patch: Partial<T> | ((prevState: Partial<T>) => Partial<T>), cover?: boolean) => void,
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

export { Options, UseMapAction, UseSetState, UseStorageOption, useBoolean, useCount, useInterval, useLocalStorage, useMap, useObject, useSessionStorage, useSetState, useSetTimeout, useStorage, useUpdate };
