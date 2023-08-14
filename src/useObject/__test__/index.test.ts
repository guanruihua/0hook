import { act, renderHook } from "@testing-library/react";
import { useObject } from '..'

describe('useObject', () => {

	it('init', async () => {
		const { result } = renderHook(() => useObject())
		expect(result.current[0]).toEqual({})
	})
	
	it('reset', async () => {
		const { result } = renderHook(() => useObject({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		}))

		act(() => {
			result.current[1].reset()
		})

		expect(result.current[0]).toEqual({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		})
	})

	it('set', async () => {
		const { result } = renderHook(() => useObject({
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
			result.current[1].set('a', 3)
		})

		act(() => {
			result.current[1].set('a', 3)
		})

		expect(result.current[0]).toEqual({
			a: 3,
			b: '2',
			c: {
				d: '3-1'
			}
		})

	});


	it('simple', async () => {
		const { result } = renderHook(() => useObject({
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
			result.current[1].set('a', 3)
		})

		expect(result.current[0]).toEqual({
			a: 3,
			b: '2',
			c: {
				d: '3-1'
			}
		})

		act(() => {
			result.current[1].set('b', '333')
		})

		expect(result.current[0]).toEqual({
			a: 3,
			b: '333',
			c: {
				d: '3-1'
			}
		})


		act(() => {
			result.current[1].set('b', '333', true)
		})


		act(() => {
			result.current[1].setObject({
				a: 3,
				b: '333',
				c: {
					d: '3-123'
				}
			})
		})

		expect(result.current[0]).toEqual({
			a: 3,
			b: '333',
			c: {
				d: '3-123'
			}
		})
		act(() => {
			result.current[1].remove('c')
		})

		expect(result.current[0]).toEqual({
			a: 3,
			b: '333',
		})


		act(() => {
			result.current[1].reset()
		})

		expect(result.current[0]).toEqual({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		})

		act(() => {
			result.current[1].reset(true)
		})

		expect(result.current[0]).toEqual({
			a: 1,
			b: '2',
			c: {
				d: '3-1'
			}
		})
	});
})