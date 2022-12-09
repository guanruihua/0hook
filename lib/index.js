'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function n(n){const t=Object.prototype.toString.call(n).match(/\[object (\w+)\]/)[1];return "Number"===t&&isNaN(n)?"NaN":t}const W="undefined"!=typeof window;W&&window?.navigator?.userAgent&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function Un(t){return "Function"===n(t)}

function useSetState(initialState = {}) {
    const [state, setState] = react.useState(initialState);
    return [
        state,
        (patch) => {
            if (Un(patch)) {
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
