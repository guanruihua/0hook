declare function useSetState<T extends Record<string, any>>(initialState?: T): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void];

export { useSetState };
