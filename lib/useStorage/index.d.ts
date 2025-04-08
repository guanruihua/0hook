export interface UseStorageOption {
    storage?: Storage;
}
export type UseStorageState = readonly [
    value: string,
    setValue: (value: string) => void
];
export declare function useStorage(key: string, initialValue?: string, options?: UseStorageOption): UseStorageState;
export declare const useLocalStorage: (key: string, initialValue?: string) => UseStorageState;
export declare const useSessionStorage: (key: string, initialValue?: string) => UseStorageState;
//# sourceMappingURL=index.d.ts.map