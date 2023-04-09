import { ObjectType } from 'abandonjs';
export declare type UseSetState<T extends ObjectType> = [
    T,
    (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void,
    (props?: string[]) => void
];
export declare function useSetState<T extends ObjectType>(initialState?: T): UseSetState<T>;
//# sourceMappingURL=index.d.ts.map