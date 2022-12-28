import { ObjectType } from 'abandonjs';

declare function useSetState<T extends ObjectType>(initialState?: T): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void];

export { useSetState };
