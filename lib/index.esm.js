import React, { useState, useCallback } from 'react';

/**
 * @title isEmpty
 * @description 是无效值 undefined , null, NaN
 * @param value {unknown} 待值
 * @returns {boolean}
 */
function isEmpty(value) {
    return value === undefined || value === null || value !== value;
}

/**
 * @title isArray
 * @description 是数组
 * @param value {unknown}
 * @returns {boolean}
 */
const isArray = Array.isArray;
/**
 * @title isEffectArray
 * @description 是有效数组
 * @param list {unknown}
 * @returns {boolean}
 */
function isEffectArray(list) {
    if (isEmpty(list))
        return false;
    return isArray(list) && list.length > 0;
}

/**
 * @title isIterator
 * @description 是iterator
 * @param value {unknown}
 * @returns {boolean}
 */
function isIterator(value) {
    if (typeof value !== 'object' || isEmpty(value))
        return false;
    return /Iterator\]$/.test(value.toString());
}

function type(param) {
    try {
        if (isIterator(param))
            return 'Iterator';
        const result = Object.prototype.toString
            .call(param)
            .match(/\[object (\w+)\]/)[1];
        if (result === 'Number' && isNaN(param))
            return 'NaN';
        return result;
    }
    catch (error) {
        return 'Undefined';
    }
}

/**
 * @title isNumber
 * @description 是数字
 * @param value {unknown}
 * @returns {boolean}
 */
const isNumber = (value) => {
    return typeof value === 'number' && type(value) === 'Number';
};
const isClient = typeof window !== 'undefined';
/**
 * @title isBoolean
 * @description 是布尔值
 * @param val {unknown}
 * @returns {boolean}
 */
const isBoolean = (val) => typeof val === 'boolean';
isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);

function useBoolean(initialState = true) {
    const [state, setState] = useState(initialState);
    return [
        state,
        useCallback((value) => setState(state => isBoolean(value) ? value : !state), [])
    ];
}

function getTargetValue(val, options = {}) {
    const { min = 0, max = Infinity } = options;
    let target = val;
    if (isNumber(max)) {
        target = Math.min(max, target);
    }
    if (isNumber(min)) {
        target = Math.max(min, target);
    }
    return target;
}
function useCount(initialState, options = {}) {
    const [state, setStateTemp] = useState(getTargetValue(initialState, options));
    const setState = (value = state) => {
        const result = getTargetValue(value + 1, options);
        if (result === state)
            return;
        setStateTemp(result);
    };
    return [state, setState];
}

function t(t){return null==t||t!=t}const c=Array.isArray;function a(n){return "object"==typeof n&&!t(n)&&/Iterator\]$/.test(n.toString())}function p(t){try{if(a(t))return "Iterator";const n=Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1];return "Number"===n&&isNaN(t)?"NaN":n}catch(t){return "Undefined"}}function j(t){return null!==t&&"object"==typeof t&&"Object"===p(t)}const K="undefined"!=typeof window;K&&window?.navigator?.userAgent&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function St(t){return "String"===p(t)?t:["Function","AsyncFunction","GeneratorFunction","Symbol","RegExp","Promise","Date","NaN","Map","Set","WeakMap","WeakSet","BigInt"].includes(p(t))?t.toString():t===1/0?"Infinity":t===-1/0?"-Infinity":void 0===t?"undefined":null===t?"null":JSON.stringify(t)}function At(t,n,e){return j(t)||c(t)?JSON.stringify(t,n,e):JSON.stringify(St(t),n,e).replace(/^(")+|(")+$/g,"")}function Ut(t,n){return t===n||At(t)===At(n)}function Ct(t,n){if(t.size!==n.size)return !1;for(const[e,r]of t){const t=n.get(e);if(r!==t||void 0===t&&!n.has(e))return !1}return !0}function Rt(t,n){if([...t].length!==[...n].length)return !1;for(const[,e]of t.entries())if(!n.has(e))return !1;return !0}function Yt(t,n){return t===n||p(t)==p(t)&&("Symbol"!==p(t)&&("Map"===p(t)?Ct(t,n):"Set"===p(t)?Rt(t,n):At(t)===At(n)))}"undefined"!=typeof window&&window?.navigator?.userAgent&&/iP(ad|hone|od)/.test(window.navigator.userAgent);"undefined"!=typeof window&&window?.navigator?.userAgent&&/iP(ad|hone|od)/.test(window.navigator.userAgent);

function useMap(initialValue) {
    const getInitialValue = () => initialValue === undefined ? new Map() : new Map(initialValue);
    const [map, setMap] = useState(() => getInitialValue());
    const set = (key, value, force = false) => {
        if (Ut(map.get(key), value) && !force) {
            return;
        }
        setMap((prev) => {
            const temp = new Map(prev);
            temp.set(key, value);
            return temp;
        });
    };
    const setAll = (newMap) => {
        setMap(new Map(newMap));
    };
    const remove = (key) => {
        setMap((prev) => {
            const temp = new Map(prev);
            temp.delete(key);
            return temp;
        });
    };
    const reset = () => setMap(getInitialValue());
    const get = (key) => map.get(key);
    return [map, {
            set,
            setAll,
            remove,
            reset,
            get,
        }];
}

function useObject(initialValue) {
    const getInitialValue = () => initialValue || {};
    const [state, setState] = useState(() => getInitialValue());
    const setObject = (record) => {
        if (Yt(record, state))
            return;
        setState(record);
    };
    const set = (key, value, force = false) => {
        if (!force && Yt(value, state[key]))
            return;
        const tempState = { ...state };
        tempState[key] = value;
        setState(tempState);
    };
    const remove = (key) => {
        if (!Object.keys(state).includes(key))
            return;
        const tempState = { ...state };
        delete tempState[key];
        setState(tempState);
    };
    const reset = (force = false) => {
        if (!force && Yt(state, getInitialValue()))
            return;
        setState(getInitialValue());
    };
    return [state,
        {
            set,
            remove,
            reset,
            setObject
        }
    ];
}

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
        },
        (props) => {
            if (isEffectArray(props)) {
                const newState = { ...state };
                props.forEach((prop) => {
                    if (isEmpty(prop))
                        return;
                    newState[prop] = undefined;
                });
                setState(newState);
                return;
            }
            setState(initialState);
        }
    ];
}

function useStorage(key, initialValue, options = {}) {
    const { storage = sessionStorage } = options;
    const defaultValue = (isEmpty(initialValue) ? storage.getItem(key) : initialValue);
    const [value, _setValue] = React.useState(defaultValue);
    const setValue = (value) => {
        _setValue(value);
        storage.setItem(key, value);
    };
    React.useEffect(() => {
        const tmpValue = storage.getItem(key);
        if (isEmpty(tmpValue))
            return;
        if (tmpValue !== value) {
            setValue(tmpValue);
        }
    }, [key, setValue, storage]);
    return [value, setValue];
}
const useLocalStorage = (key, initialValue) => useStorage(key, initialValue, { storage: localStorage });
const useSessionStorage = (key, initialValue) => useStorage(key, initialValue, { storage: sessionStorage });

const useUpdate = () => {
    const [, setState] = useState({});
    return useCallback(() => setState({}), []);
};

export { useBoolean, useCount, useLocalStorage, useMap, useObject, useSessionStorage, useSetState, useStorage, useUpdate };
//# sourceMappingURL=index.esm.js.map
