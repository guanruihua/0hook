import { ObjectType } from 'abandonjs';
export declare type UseSetState<T extends ObjectType> = readonly [
    Partial<T>,
    (patch: Partial<T> | ((prevState: Partial<T>) => Partial<T>), cover?: boolean) => void,
    (props?: (string | number)[]) => void
];
export declare function useSetState<T extends ObjectType>(initialState?: T): UseSetState<T>;
//# sourceMappingURL=index.d.ts.map