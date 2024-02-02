'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
 * @title isString
 * @description 是字符串
 * @param value {unknown}
 * @returns {boolean}
 */
function isString(value) {
    return typeof value === 'string';
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
    const [state, setState] = React.useState(initialState);
    return [
        state,
        React.useCallback((value) => setState(state => isBoolean(value) ? value : !state), [])
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
function useCount(initialState = 0, options = {}) {
    const [state, setStateTemp] = React.useState(getTargetValue(initialState, options));
    const setState = (value) => {
        if (isEmpty(value)) {
            const result = getTargetValue(state + 1, options);
            if (result !== state)
                setStateTemp(result);
            return;
        }
        setStateTemp(getTargetValue(value, options));
        return;
    };
    return [state, setState];
}

function e(e){return null==e||e!=e}function n(e){return Array.isArray(e)}function u(t){try{if("object"==typeof(n=t)&&!e(n)&&/Iterator\]$/.test(n.toString()))return "Iterator";const r=Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1];return "Number"===r&&isNaN(t)?"NaN":r}catch(e){return "Undefined"}var n;}function c(e){return null!==e&&"object"==typeof e&&"Object"===u(e)}function s(e){return "string"==typeof e}const h="undefined"!=typeof window;function m(e){return "Set"===u(e)}function y(e){return "Map"===u(e)}h&&window?.navigator?.userAgent&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function F(t){return s(t)?t:e(t)?"":["Function","AsyncFunction","GeneratorFunction","Symbol","RegExp","Promise","Date","Map","Set","WeakMap","WeakSet","BigInt"].includes(u(t))?t.toString():t===1/0?"Infinity":t===-1/0?"-Infinity":JSON.stringify(t)}function C(t,r,u){return c(t)||n(t)||e(t)?JSON.stringify(t,r,u):JSON.stringify(F(t),r,u).replace(/^(")+|(")+$/g,"")}function q(e,t){if(!c(e)||!c(t))return !1;const n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return !1;for(let r=0;r<n.length;r++){const u=n[r];if(!G(e[u],t[u]))return !1}return !0}function L(e,t){if(!y(e)||!y(t)||e.size!==t.size)return !1;for(const[n,r]of e){const e=t.get(n);if(r!==e||void 0===e)return !1}return !0}function V(e,t){if(!m(e)||!m(t)||e.size!==t.size)return !1;for(const[,n]of e.entries())if(!t.has(n))return !1;return !0}function G(e,t){return u(e)===u(t)&&(e===t||(c(e)&&c(t)?q(e,t):"Symbol"!==u(e)&&"Symbol"!==u(t)&&("Map"===u(e)?L(e,t):"Set"===u(e)?V(e,t):C(e)===C(t))))}"undefined"!=typeof window&&window?.navigator?.userAgent&&/iP(ad|hone|od)/.test(window.navigator.userAgent);"undefined"!=typeof window&&window?.navigator?.userAgent&&/iP(ad|hone|od)/.test(window.navigator.userAgent);

function useMap(initialValue) {
    const getInitialValue = () => initialValue === undefined ? new Map() : new Map(initialValue);
    const [map, setMap] = React.useState(() => getInitialValue());
    const set = (key, value, force = false) => {
        if (G(map.get(key), value) && !force) {
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
    const keys = () => Array.from(map.keys());
    return [map, {
            keys,
            set,
            setAll,
            remove,
            reset,
            get,
        }];
}

function useObject(initialValue) {
    const getInitialValue = () => initialValue || {};
    const [state, setState] = React.useState(() => getInitialValue());
    const setObject = (record) => {
        if (!G(record, state))
            setState(record);
    };
    const set = (key, value, force = false) => {
        if (!force && G(value, state[key]))
            return;
        const tempState = { ...state };
        tempState[key] = value;
        setState(tempState);
    };
    const remove = (key) => {
        if (Object.keys(state).includes(key)) {
            const tempState = { ...state };
            delete tempState[key];
            setState(tempState);
        }
    };
    const reset = (force = false) => {
        if (!force && G(state, getInitialValue()))
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
    const [state, setState] = React.useState(initialState);
    return [
        state,
        (patch, cover = false) => {
            const coverState = typeof patch === 'function' ? patch(state) : patch;
            if (cover) {
                setState(coverState);
            }
            else {
                setState({ ...state, ...coverState });
            }
        },
        (props) => {
            if (isEffectArray(props)) {
                const newState = { ...state };
                props.forEach((prop) => {
                    if (isString(prop) || isNumber(prop))
                        newState[prop] = initialState[prop];
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
    const getDefaultValue = () => isEmpty(storage.getItem(key)) ? initialValue : storage.getItem(key);
    const [value, _setValue] = React__default["default"].useState(getDefaultValue() || null);
    const setValue = (value) => {
        _setValue(value);
    };
    React__default["default"].useEffect(() => {
        const tmpValue = storage.getItem(key);
        if (isEmpty(tmpValue))
            return;
    }, [key, setValue, storage]);
    return [value, setValue];
}
const useLocalStorage = (key, initialValue) => useStorage(key, initialValue, { storage: localStorage });
const useSessionStorage = (key, initialValue) => useStorage(key, initialValue, { storage: sessionStorage });

const useUpdate = () => {
    const [, setState] = React.useState(1);
    return React.useCallback(() => setState(1), []);
};

function useInterval(callback, delay) {
    const savedCallback = React__default["default"].useRef(() => {
        return;
    });
    savedCallback.current = callback;
    const [myTimer, setMyTimer] = React__default["default"].useState(null);
    React__default["default"].useEffect(() => {
        if (delay !== null) {
            const handler = () => savedCallback.current();
            const timer = setInterval(handler, delay);
            setMyTimer(timer);
            return () => timer && clearInterval(timer);
        }
    }, [delay]);
    return myTimer;
}

function useSetTimeout(callback, delay) {
    const savedCallback = React__default["default"].useRef(() => { return; });
    savedCallback.current = callback;
    React__default["default"].useEffect(() => {
        if (delay !== null) {
            const handler = () => savedCallback.current();
            const timer = setTimeout(handler, delay);
            return () => clearInterval(timer);
        }
    }, [delay]);
}

exports.useBoolean = useBoolean;
exports.useCount = useCount;
exports.useInterval = useInterval;
exports.useLocalStorage = useLocalStorage;
exports.useMap = useMap;
exports.useObject = useObject;
exports.useSessionStorage = useSessionStorage;
exports.useSetState = useSetState;
exports.useSetTimeout = useSetTimeout;
exports.useStorage = useStorage;
exports.useUpdate = useUpdate;
//# sourceMappingURL=index.js.map
