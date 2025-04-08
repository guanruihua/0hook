import { ObjectType } from '0type';
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
export declare function useSetState<T extends ObjectType>(initialState?: T, cacheKey?: string, storage?: Storage): UseSetState<T>;
//# sourceMappingURL=index.d.ts.map