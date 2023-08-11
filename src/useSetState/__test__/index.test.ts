import { act, renderHook } from "@testing-library/react";
import { useSetState } from '..'

describe('useSetState', () => {

	it('useSetState-reset', async () => {
		const { result } = renderHook(() => useSetState({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		}))

		expect(result.current[0]).toEqual({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		})

		act(() => {
			result.current[1]({ 'a': 3 }, true)
		})


		expect(result.current[0]).toEqual({ 'a': 3 })

		act(() => {
			result.current[2](['a'])
		})

		expect(result.current[0]).toEqual({ 'a': 1 })

		act(() => {
			result.current[2]()
		})

		expect(result.current[0]).toEqual({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		})

		act(() => {
			result.current[2]([1])
		})

		expect(result.current[0]).toEqual({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		})

	});
	it('useSetState-set', async () => {
		const { result } = renderHook(() => useSetState({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		}))

		expect(result.current[0]).toEqual({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		})

		act(() => {
			result.current[1]({ 'a': 3 })
		})

		expect(result.current[0]).toEqual({
			a: 3,
			b: '2',
			c: {
				d: '3-1'
			}
		})

		act(() => {
			result.current[1]({ 'a': 3 }, true)
		})

		expect(result.current[0]).toEqual({ 'a': 3 })
		act(() => {
			result.current[1](() => ({ 'a': 3 }), true)
		})

		expect(result.current[0]).toEqual({ 'a': 3 })
	});

})