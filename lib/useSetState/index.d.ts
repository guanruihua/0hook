import { ObjectType } from 'abandonjs';
export declare function useSetState<T extends ObjectType>(initialState?: T): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void];
//# sourceMappingURL=index.d.ts.map