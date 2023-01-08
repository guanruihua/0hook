import { useState, useCallback } from 'react';

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
/**
 * @title isNumber
 * @description 是否为数字
 * @param num 待检测的数据类型
 * @returns {boolean}
 */
const isNumber = (val) => type(val) === 'Number';
const isClient = typeof window !== 'undefined';
isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);

/**
 * @title toString
 * @description 任意类型均可转换为string
 * @param value {any}
 * @returns {string}
 * @lastUpdate: 2.2.1
 */
function toString$1(value) {
    if (type(value) === 'String')
        return value;
    if ([
        'Function', 'AsyncFunction', 'GeneratorFunction',
        'Symbol', 'RegExp', 'Promise', 'Date', 'NaN',
        'Map', 'Set', 'WeakMap', 'WeakSet', 'BigInt'
    ].includes(type(value)))
        return value.toString();
    if (value === Infinity)
        return 'Infinity';
    if (value === -Infinity)
        return '-Infinity';
    if (value === undefined)
        return 'undefined';
    if (value === null)
        return 'null';
    return JSON.stringify(value);
}

function stringify(value, replacer, space) {
    if (['Object', 'Array'].includes(type(value))) {
        return JSON.stringify(value, replacer, space);
    }
    return JSON.stringify(toString$1(value), replacer, space)
        .replace(/^(")+|(")+$/g, '');
}
/**
 * @title equal
 * @description 比较是否值和类型是否相等
 * @param value any
 * @param lastValue any
 * @returns
 */
function equal(value, lastValue) {
    if (value === lastValue)
        return true;
    if (type(value) !== type(value))
        return false;
    if (type(value) === 'Symbol')
        return false;
    if (stringify(value) === stringify(lastValue))
        return true;
    return false;
}

function isEqual(compareValue, beCompareValue) {
    if (compareValue === beCompareValue)
        return true;
    return stringify(compareValue) === stringify(beCompareValue);
}

function useSetState(initialState = {}) {
    const [state, setState] = useState(initialState);
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
    const setState = (value) => {
        const result = getTargetValue(value, options);
        if (result === state)
            return;
        setStateTemp(result);
    };
    return [state, setState];
}

function useBoolean(initialState = true) {
    const [state, setState] = useState(initialState);
    return [
        state,
        useCallback(() => setState(state => !state), [])
    ];
}

function useObject(initialValue) {
    const getInitialValue = () => initialValue || {};
    const [state, setState] = useState(() => getInitialValue());
    const setObject = (record) => {
        if (equal(record, state))
            return;
        setState(record);
    };
    const set = (key, value, force = false) => {
        if (!force && equal(value, state[key]))
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
        if (!force && equal(state, getInitialValue()))
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

function useMap(initialValue) {
    const getInitialValue = () => initialValue === undefined ? new Map() : new Map(initialValue);
    const [map, setMap] = useState(() => getInitialValue());
    const set = (key, value, force = false) => {
        if (isEqual(map.get(key), value) && !force) {
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

export { useBoolean, useCount, useMap, useObject, useSetState };
//# sourceMappingURL=index.esm.js.map
