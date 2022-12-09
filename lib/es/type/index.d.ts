declare type TParams = any;
declare type TData = any;
interface iUseRequestConfig {
    manual?: boolean;
    defaultParams?: TParams;
    onBefore?: (params: TParams) => void;
    onSuccess?: (data: TData, params: TParams) => void;
    onError?: (e: Error, params: TParams) => void;
    onFinally?: (params: TParams, data?: TData, e?: Error) => void;
}
declare function useRequest(service: any, config?: iUseRequestConfig): any;

declare function useForm(): void;

declare function useSetState<T extends Record<string, any>>(initialState?: T): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void];

declare type UseState<T> = [T, (value: T) => void];
interface StorageOption<T> {
    defaultValue?: T;
    /**
     * @description 是否需要序列号处理
     * @default false
     */
    parse?: boolean;
    /**
     * @description 自定义序列化
     */
    serializer?: (value: T) => string;
    /**
     * @description 自定义饭序列化
     */
    deserializer?: (value: string) => T;
    /**
     * @default localStorage
     */
    storage?: Storage;
}
declare function useStorage<T>(key: string, options?: StorageOption<T>): UseState<T>;
interface GetStorageOption<T> extends StorageOption<T> {
}
declare function getStorage<T>(key: string, options?: GetStorageOption<T>): T;
interface SetStorageOption<T> extends Omit<StorageOption<T>, 'defaultValue'> {
    value: T;
}
declare function setStorage<T>(key: string, options?: SetStorageOption<T>): boolean;

declare function getLocalStorage<T>(key: string, options?: Omit<GetStorageOption<T>, 'storage'>): T;
declare function setLocalStorage<T>(key: string, options?: Omit<SetStorageOption<T>, 'storage'>): boolean;
declare function useLocalStorage<T>(key: string, options?: Omit<StorageOption<T>, 'storage'>): UseState<T>;
declare function getSessionStorage<T>(key: string, options?: Omit<GetStorageOption<T>, 'storage'>): T;
declare function setSessionStorage<T>(key: string, options?: Omit<SetStorageOption<T>, 'storage'>): boolean;
declare function useSessionStorage<T>(key: string, options?: Omit<StorageOption<T>, 'storage'>): UseState<T>;

export { GetStorageOption, SetStorageOption, StorageOption, UseState, getLocalStorage, getSessionStorage, getStorage, iUseRequestConfig, setLocalStorage, setSessionStorage, setStorage, useForm, useLocalStorage, useRequest, useSessionStorage, useSetState, useStorage };
