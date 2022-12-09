// import { UseState, getStorage, setStorage, useStorage } from './storage'
// import type { SetStorageOption, StorageOption, GetStorageOption } from './storage'

// export { UseState, getStorage, setStorage, useStorage }
// export type { SetStorageOption, StorageOption, GetStorageOption }

// export function getLocalStorage<T>(key: string, options?: Omit<GetStorageOption<T>, 'storage'>): T {
// 	return getStorage<T>(key, { storage: localStorage, ...options })
// }

// export function setLocalStorage<T>(key: string, options?: Omit<SetStorageOption<T>, 'storage'>): boolean {
// 	return setStorage<T>(key, { storage: localStorage, ...options })
// }

// export function useLocalStorage<T>(key: string, options?: Omit<StorageOption<T>, 'storage'>): UseState<T> {
// 	return useStorage<T>(key, { storage: localStorage, ...options })
// }

// export function getSessionStorage<T>(key: string, options?: Omit<GetStorageOption<T>, 'storage'>): T {
// 	return getStorage<T>(key, { storage: sessionStorage, ...options })
// }

// export function setSessionStorage<T>(key: string, options?: Omit<SetStorageOption<T>, 'storage'>): boolean {
// 	return setStorage<T>(key, { storage: sessionStorage, ...options })
// }

// export function useSessionStorage<T>(key: string, options?: Omit<StorageOption<T>, 'storage'>): UseState<T> {
// 	return useStorage<T>(key, { storage: sessionStorage, ...options })
// }