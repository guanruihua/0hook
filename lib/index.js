'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/**
 * @title isArray
 * @description 是否为数组
 * @param value any
 * @returns boolean
 */

function type(param) {
    const result = Object.prototype.toString
        .call(param)
        .match(/\[object (\w+)\]/)[1];
    if (result === 'Number' && isNaN(param))
        return 'NaN';
    return result;
}

/**
 * @title isFunction
 * @description 是否为普通函数
 * @param value {any}
 * @returns {boolean}
 */
function isFunction(value) {
    return type(value) === 'Function';
}
const isClient = typeof window !== 'undefined';
isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);

function useSetState(initialState = {}) {
    const [state, setState] = react.useState(initialState);
    return [
        state,
        (patch) => {
            if (isFunction(patch)) {
                setState({ ...state, ...patch(state) });
            }
            else {
                setState({ ...state, ...patch });
            }
        }
    ];
}

exports.useSetState = useSetState;
//# sourceMappingURL=index.js.map
