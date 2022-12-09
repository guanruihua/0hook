import { useState } from 'react';

function useSetState(initialState = {}) {
    const [state, setState] = useState(initialState);
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

export { useSetState };
//# sourceMappingURL=index.esm.js.map
