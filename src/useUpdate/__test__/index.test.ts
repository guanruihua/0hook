import { act, renderHook } from "@testing-library/react";
import { useUpdate } from '..'

describe('useUpdate', () => {
	
	it('simple', async () => {
		const { result } = renderHook(() => useUpdate())

		act(() => {
			result.current()
		})
	});
	it('should be defined', () => {
		expect(useUpdate).toBeDefined();
	});
})