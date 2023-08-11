import { act, renderHook } from "@testing-library/react";
import { useBoolean } from '..'

describe('useBoolean', () => {
	it('useBoolean', async () => {
		const { result } = renderHook(() => useBoolean())
		expect(result.current[0]).toEqual(true)
		act(() => {
			result.current[1]()
		})
		expect(result.current[0]).toEqual(false)
		act(() => {
			result.current[1]()
		})
		expect(result.current[0]).toEqual(true)
		act(() => {
			result.current[1](true)
		})
		expect(result.current[0]).toEqual(true)
	});
})