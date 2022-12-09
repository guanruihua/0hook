'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function useSetState(initialState = {}) {
    const [state, setState] = react.useState(initialState);
    return [
        state,
        (patch) => {
            if (typeof patch === 'function') {
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
