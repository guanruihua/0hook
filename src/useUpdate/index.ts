import { useCallback, useState } from 'react';

/**
 * @title useUpdate
 * @description 通过 点击事件刷新组件
 * @returns {()=>void}
 */
export const useUpdate = () => {
	const [, setState] = useState(1);

	return useCallback(() => setState(1), []);
}