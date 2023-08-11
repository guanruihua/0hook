import { act, renderHook } from "@testing-library/react";
import { useCount } from '..'

describe('useCount', () => {
	it('useCount(min, max)', async () => {
		const { result } = renderHook(() => useCount(0, { min: -10, max: 10 }))
		expect(result.current[0]).toEqual(0)
		act(() => {
			result.current[1](-100)
		})
		expect(result.current[0]).toEqual(-10)
		act(() => {
			result.current[1](100)
		})
		expect(result.current[0]).toEqual(10)
	});
	it('useCount+1', async () => {
		const { result } = renderHook(() => useCount())
		expect(result.current[0]).toEqual(0)
		act(() => {
			result.current[1]()
		})
		expect(result.current[0]).toEqual(1)
	});
	it('useCount+n', async () => {
		const { result } = renderHook(() => useCount())
		expect(result.current[0]).toEqual(0)
		act(() => {
			result.current[1]()
		})
		act(() => {
			result.current[1]()
		})
		act(() => {
			result.current[1]()
		})
		act(() => {
			result.current[1]()
		})
		act(() => {
			result.current[1]()
		})
		expect(result.current[0]).toEqual(5)
	});
	it('useCount+setValue', async () => {
		const { result } = renderHook(() => useCount())
		expect(result.current[0]).toEqual(0)
		act(() => {
			result.current[1](100)
		})
		expect(result.current[0]).toEqual(100)
	});
})