export interface UseStorageOption {
    storage?: Storage;
}
export declare type UseStorageState<T = string> = readonly [value: T | null, setValue: (value: T) => void];
export declare function useStorage<T = string>(key: string, initialValue?: T | null, options?: UseStorageOption): UseStorageState<T>;
export declare const useLocalStorage: (key: string, initialValue?: string | null) => UseStorageState<string>;
export declare const useSessionStorage: (key: string, initialValue?: string | null) => UseStorageState<string>;
//# sourceMappingURL=index.d.ts.map