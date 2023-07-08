export interface UseStorageOption {
    storage?: Storage;
}
export declare function useStorage(key: string, initialValue?: string | null, options?: UseStorageOption): readonly [
    value: string | null,
    setValue: (value: string) => void
];
export declare const useLocalStorage: (key: string, initialValue?: string | null) => readonly [value: string | null, setValue: (value: string) => void];
export declare const useSessionStorage: (key: string, initialValue?: string | null) => readonly [value: string | null, setValue: (value: string) => void];
//# sourceMappingURL=index.d.ts.map