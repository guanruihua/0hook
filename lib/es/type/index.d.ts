import { ObjectType } from 'abandonjs';
import { ObjectType as ObjectType$1 } from '0type';
import { DependencyList } from 'react';

/**
 * @title useBoolean
 * @description 布尔值切换
 * @param initialState {boolean=true}
 * @returns [boolean, ()=>void]
 */
declare function useBoolean(initialState?: boolean): readonly [boolean, (value?: boolean) => void];

type Options = {
    /**
     * @default 0
     */
    min?: number;
    max?: number;
};
/**
 * @title useCount
 * @description 计数
 * @param initialState {number=0}
 * @param options {min?:number,max?:number}
 * @returns [number, (value?:number)=>void]
 */
declare function useCount(initialState?: number, options?: Options): readonly [number, (value?: number) => void];

interface UseMapAction<Key = string, Value = any> {
    set: (key: Key, value: Value, force?: boolean) => void;
    setAll: (newMap: Iterable<readonly [Key, Value]>, force?: boolean) => void;
    remove: (key: Key) => void;
    reset: (force?: boolean) => void;
    get: (key: Key) => Value | undefined;
    keys: () => Key[];
}
/**
 * @title useMap<Key,Value>
 * @description Map数据管理
 * @param initialValue {Map}
 * @returns {[Map, Actions]}
 */
declare function useMap<Key = string, Value = any>(initialValue?: Iterable<readonly [Key, Value]>): readonly [Map<Key, Value>, UseMapAction<Key, Value>];

type ObjectValue<UseObjectType = ObjectType> = UseObjectType[keyof UseObjectType];
interface UseObjectActions<ObjectValueType = ObjectType> {
    /**
     * @description 直接替换掉管理的值
     * @param record {object}
     */
    setObject: (record: ObjectValueType) => void;
    /**
     * @description 设置值
     * @param key {string} 属性名
     * @param value {unknown} 属性值
     * @param force {boolean=false} false:若和当前值相等则不执行
     */
    set: (key: keyof ObjectValueType, value: ObjectValue<ObjectValueType>, force?: boolean) => void;
    /**
     * @description 删除属性
     * @param key {string} 删除的属性
     */
    remove: (key: keyof ObjectValueType) => void;
    /**
     * @description 重置
     * @param force {boolean=false} false:若和当前值相等则不执行
     */
    reset: (force?: boolean) => void;
}
/**
 * @title useObject<Object>
 * @description 管理对象状态
 * @param initialValue {?Object}
 * @returns [object, Actions<Object>]
 */
declare function useObject<ObjectValueType = ObjectType>(initialValue?: ObjectValueType): readonly [ObjectValueType, UseObjectActions<ObjectValueType>];

/**
 * @title UseSetState<T>
 * @description 类似 setState 的使用
 * @param 0 state {T} 状态
 * @param 1 setState {T} 修改状态
 * @param 2 resetState {T} 恢复默认状态
 */
type UseSetState<T extends ObjectType$1> = readonly [
    Partial<T>,
    (patch: Partial<T> | ((prevState: Partial<T>) => Partial<T>), cover?: boolean) => void,
    (props?: (string | number)[]) => void
];
/**
 * @title useSetState<T>
 * @description 类似 setState 的使用
 * @param {T} initialState 默认值
 * @param {string} [cacheKey] 缓存索引
 * @param  {Storage}[storage=localStorage] 缓存类型
 * @returns {UseSetState}
 */
declare function useSetState<T extends ObjectType$1>(initialState?: T, cacheKey?: string, storage?: Storage): UseSetState<T>;

interface UseStorageOption {
    storage?: Storage;
}
type UseStorageState = readonly [
    value: string,
    setValue: (value: string) => void
];
declare function useStorage(key: string, initialValue?: string, options?: UseStorageOption): UseStorageState;
declare const useLocalStorage: (key: string, initialValue?: string) => UseStorageState;
declare const useSessionStorage: (key: string, initialValue?: string) => UseStorageState;

/**
 * @title useUpdate
 * @description 通过 点击事件刷新组件
 * @returns {()=>void}
 */
declare const useUpdate: () => () => void;

/**
 * @title useInterval
 * @description useEffect 和 setInterval 的使用, 主要解决React this指向问题
 * @param callback {()=>void}
 * @param delay {number|null}
 * @returns {NodeJS.Timer|null}
 */
declare function useInterval(callback: () => void, delay: number | null): NodeJS.Timer | null;

/**
 * @title useSetTimeout
 * @description useEffect 和 setTimeout 的使用, 主要解决React this指向问题
 * @param callback {()=>void}
 * @param delay {number|null}
 */
declare function useSetTimeout(callback: () => void, delay: number | null): void;

type Result = void | Promise<void>;
declare function useDebounceEffect(fn: () => Result | (() => Result), waitTime: number, deps?: DependencyList): void;

export { Options, UseMapAction, UseObjectActions, UseSetState, UseStorageOption, UseStorageState, useBoolean, useCount, useDebounceEffect, useInterval, useLocalStorage, useMap, useObject, useSessionStorage, useSetState, useSetTimeout, useStorage, useUpdate };
