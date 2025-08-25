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
function isEmpty$1(value) {
    return value === undefined || value === null || value !== value;
}

/**
 * @title isIterator
 * @description 是iterator
 * @param {unknown} value
 * @returns {boolean}
 */
function isIterator$1(value) {
    if (typeof value !== 'object' || isEmpty$1(value))
        return false;
    return /Iterator\]$/.test(value.toString());
}

function type$1(param) {
    try {
        if (isIterator$1(param))
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
 * @param {unknown} value
 * @returns {boolean}
 */
function isString(value) {
    return typeof value === 'string';
}

/**
 * @title isNumber
 * @description 是数字
 * @param {unknown} value
 * @returns {boolean}
 */
const isNumber = (value) => {
    return typeof value === 'number' && type$1(value) === 'Number';
};

/**
 * @title isArray
 * @description 是数组
 * @param {unknown} list
 * @returns {boolean}
 */
function isArray$1(list) {
    return Array.isArray(list);
}
/**
 * @title isEffectArray
 * @description 是有效数组
 * @param {unknown} list
 * @returns {boolean}
 */
function isEffectArray(list) {
    if (isEmpty$1(list))
        return false;
    return isArray$1(list) && list.length > 0;
}
/**
 * @title isClient
 * @description 是否为客户端
 */
const isClient = typeof window !== 'undefined';
/**
 * @title isBoolean
 * @description 是布尔值
 * @param {unknown} val
 * @returns {boolean}
 */
const isBoolean = (val) => typeof val === 'boolean';
/**
 * @title isIOS
 * @returns {boolean}
 */
isClient &&
    window?.navigator?.userAgent &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent);

/**
 * @title useBoolean
 * @description 布尔值切换
 * @param initialState {boolean=true}
 * @returns [boolean, ()=>void]
 */
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
/**
 * @title useCount
 * @description 计数
 * @param initialState {number=0}
 * @param options {min?:number,max?:number}
 * @returns [number, (value?:number)=>void]
 */
function useCount(initialState = 0, options = {}) {
    const [state, setStateTemp] = React.useState(getTargetValue(initialState, options));
    const setState = (value) => {
        if (isEmpty$1(value)) {
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
function isArray(list) {
    return Array.isArray(list);
}

/**
 * @title isIterator
 * @description 是iterator
 * @param {unknown} value
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
 * @title isObject
 * @description 是Object
 * @param {unknown} value
 * @returns {boolean}
 */
function isObject(value) {
    return value !== null && typeof value === 'object' && type(value) === 'Object';
}

/**
 * @title isDate
 * @description 检查日期是否有效
 * @param {unknown} date 待判断日期
 * @returns {boolean}
 * @version 0.1.0
 */
function isDate(date) {
    return type(date) === 'Date';
}

/**
 * @title isSet
 * @param {unknown} value
 * @returns {boolean}
 */
function isSet(value) {
    return type(value) === 'Set';
}

/**
 * @title isMap
 * @param {unknown} value
 * @returns {boolean}
 */
function isMap(value) {
    return type(value) === 'Map';
}

/**
 * @title equalHelper
 * @description 比较是否值和类型是否相等, 不支持WeakMap, WeakSet
 * @param {unknown} compareValue
 * @param {unknown} beCompareValue
 * @returns {boolean}
 */
function equalHelper(compareValue, beCompareValue) {
    const compareValueType = type(compareValue);
    const beCompareValueType = type(beCompareValue);
    if (compareValue !== beCompareValueType || compareValueType === 'Symbol')
        return false;
    return compareValue === beCompareValue;
}

/**
 * @title equalMap
 * @param {MapType} compareMap
 * @param {MapType} beCompareMap
 * @returns {boolean}
 */
function equalMap(compareMap, beCompareMap, equal = equalHelper) {
    if (!isMap(compareMap) ||
        !isMap(beCompareMap) ||
        compareMap.size !== beCompareMap.size)
        return false;
    for (const [key, value] of compareMap) {
        const beCompareMapTempValue = beCompareMap.get(key);
        if (equal(value, beCompareMapTempValue)) {
            continue;
        }
        return false;
    }
    return true;
}

/**
 * @title equalSet
 * @param {SetType} compareSet
 * @param {SetType} beCompareSet
 * @returns {boolean}
 */
function equalSet(compareSet, beCompareSet, equal = equalHelper) {
    if (!isSet(compareSet) ||
        !isSet(beCompareSet) ||
        compareSet.size !== beCompareSet.size)
        return false;
    const list = [...compareSet];
    const beList = [...beCompareSet];
    for (let i = 0; i < list.length; i++) {
        if (equal(list[i], beList[i])) {
            continue;
        }
        return false;
    }
    // for (const value of compareSet) {
    //   if (beCompareSet.has(value)) continue
    //   return false
    // }
    return true;
}

/**
 * @title equalArray
 * @param {unknown|any[]} compare
 * @param {unknown|any[]} beCompare
 * @returns {boolean}
 */
function equalArray(compare, beCompare, equal = equalHelper) {
    if (isArray(compare) &&
        isArray(beCompare) &&
        compare.length === beCompare.length) {
        for (let i = 0; i < compare.length; i++) {
            const item = compare[i];
            if (equal(item, beCompare[i])) {
                continue;
            }
            return false;
        }
        return true;
    }
    return false;
}

function equalObject(compare, beCompare, equal = equalHelper) {
    if (!isObject(compare) || !isObject(beCompare))
        return false;
    const compareValueKeys = Object.keys(compare);
    const beCompareValueKeys = Object.keys(beCompare);
    if (compareValueKeys.length !== beCompareValueKeys.length)
        return false;
    for (let i = 0; i < compareValueKeys.length; i++) {
        const key = compareValueKeys[i];
        if (equal(compare[key], beCompare[key]))
            continue;
        return false;
    }
    return true;
}

/**
 * @title equal
 * @description 比较是否值和类型是否相等/相同, 不支持类型由`===`来比较
 * @supported 基础数据类型, Object, Array, Map, Set, Date
 * @notSupported WeakMap, WeakSet
 * @param {unknown} compareValue
 * @param {unknown} beCompareValue
 * @returns {boolean}
 * @version 2.4.4
 * @lastUpdate 3.8.0
 */
function equal(compareValue, beCompareValue) {
    const compareValueType = type(compareValue);
    const beCompareValueType = type(beCompareValue);
    if (compareValueType !== beCompareValueType)
        return false;
    if (compareValueType === 'Object')
        return equalObject(compareValue, beCompareValue, equal);
    if (compareValueType === 'Array')
        return equalArray(compareValue, beCompareValue, equal);
    if (compareValueType === 'Map')
        return equalMap(compareValue, beCompareValue, equal);
    if (compareValueType === 'Set')
        return equalSet(compareValue, beCompareValue, equal);
    if (Number.isNaN(compareValue))
        return Number.isNaN(beCompareValue);
    if (isDate(compareValue) && isDate(beCompareValue))
        return compareValue.getTime() === beCompareValue.getTime();
    return compareValue === beCompareValue;
}

/**
 * @title useMap<Key,Value>
 * @description Map数据管理
 * @param initialValue {Map}
 * @returns {[Map, Actions]}
 */
function useMap(initialValue) {
    const getInitialValue = () => initialValue === undefined ? new Map() : new Map(initialValue);
    const [map, setMap] = React.useState(() => getInitialValue());
    const set = (key, value, force = false) => {
        if (equal(map.get(key), value) && !force) {
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

/**
 * @title useObject<Object>
 * @description 管理对象状态
 * @param initialValue {?Object}
 * @returns [object, Actions<Object>]
 */
function useObject(initialValue) {
    const getInitialValue = () => initialValue || {};
    const [state, setState] = React.useState(() => getInitialValue());
    const setObject = (record) => {
        if (!equal(record, state))
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
        if (Object.keys(state).includes(key)) {
            const tempState = { ...state };
            delete tempState[key];
            setState(tempState);
        }
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

/**
 * @title useSetState<T>
 * @description 类似 setState 的使用
 * @param {T} initialState 默认值
 * @param {string} [cacheKey] 缓存索引
 * @param  {Storage}[storage=localStorage] 缓存类型
 * @returns {UseSetState}
 */
function useSetState(initialState = {}, cacheKey, storage = localStorage) {
    const [state, _setState] = React.useState(initialState);
    const setState = (newVal) => {
        _setState(newVal);
        if (!cacheKey)
            return;
        try {
            storage.setItem(cacheKey, JSON.stringify(newVal));
        }
        catch (error) {
            console.warn(error);
            return;
        }
    };
    React.useEffect(() => {
        if (!cacheKey)
            return;
        try {
            const cacheStr = storage.getItem(cacheKey);
            if (!cacheStr || cacheStr === '{}')
                return;
            setState(JSON.parse(cacheStr));
        }
        catch (error) {
            return;
        }
    }, [cacheKey, storage]);
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
        },
    ];
}

function useStorage(key, initialValue, options = {}) {
    const { storage = sessionStorage } = options;
    const getDefaultValue = () => {
        try {
            return isEmpty$1(storage.getItem(key)) ? initialValue : storage.getItem(key);
        }
        catch (error) {
            return null;
        }
    };
    const [value, _setValue] = React__default["default"].useState(getDefaultValue() || '');
    const setValue = (value) => {
        _setValue(value);
        if (isString(value)) {
            storage.setItem(key, value);
        }
        else {
            storage.setItem(key, JSON.stringify(value));
        }
    };
    React__default["default"].useEffect(() => {
        const tmpValue = storage.getItem(key);
        if (isEmpty$1(tmpValue))
            return;
        if (tmpValue !== value) {
            setValue(tmpValue);
        }
    }, [key, setValue, storage]);
    return [value, setValue];
}
const useLocalStorage = (key, initialValue) => useStorage(key, initialValue, { storage: localStorage });
const useSessionStorage = (key, initialValue) => useStorage(key, initialValue, { storage: sessionStorage });

/**
 * @title useUpdate
 * @description 通过 点击事件刷新组件
 * @returns {()=>void}
 */
const useUpdate = () => {
    const [, setState] = React.useState(1);
    return React.useCallback(() => setState(1), []);
};

/**
 * @title useInterval
 * @description useEffect 和 setInterval 的使用, 主要解决React this指向问题
 * @param callback {()=>void}
 * @param delay {number|null}
 * @returns {NodeJS.Timer|null}
 */
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

/**
 * @title useSetTimeout
 * @description useEffect 和 setTimeout 的使用, 主要解决React this指向问题
 * @param callback {()=>void}
 * @param delay {number|null}
 */
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

function useDebounceEffect(fn, waitTime, deps) {
    React.useEffect(() => {
        let cb = null;
        const t = setTimeout(async () => {
            const result = fn && (await fn());
            if (result)
                cb = result;
        }, waitTime);
        return () => {
            clearTimeout(t);
            cb && cb();
        };
    }, deps);
}

/**
 * @title useEventListener<T = any>
 * @param {keyof WindowEventMap} type
 * @param {(e:Event)=> T | undefined} listener 监听回调方法, 通过返回值对state赋值
 * @param {T} [defaultValue]
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {[T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>]}
 */
function useEventListener(type, listener, defaultValue, options) {
    const ref = React__default["default"].useRef(defaultValue);
    const [state, _setState] = React__default["default"].useState(defaultValue);
    const onListener = (e) => {
        e?.preventDefault();
        ref.current = listener(e);
        _setState(ref.current);
    };
    React__default["default"].useEffect(() => {
        window.removeEventListener(type, onListener);
        window.addEventListener(type, onListener, isBoolean(options) ? options : { passive: true, ...options });
        onListener();
        return () => {
            window.removeEventListener(type, onListener);
        };
    }, []);
    return [state, _setState];
}

function useEventController() {
    const controllerRef = React__default["default"].useRef(null);
    React__default["default"].useEffect(() => {
        controllerRef.current = new AbortController();
        return () => {
            controllerRef.current?.abort();
        };
    }, []);
    const addEventListener = (target, event, handler, options) => {
        if (!controllerRef.current)
            return;
        const element = target?.current || target;
        if (!element)
            return;
        element.addEventListener(event, handler, {
            signal: controllerRef.current?.signal,
            ...options,
        });
    };
    return { addEventListener };
}

exports.useBoolean = useBoolean;
exports.useCount = useCount;
exports.useDebounceEffect = useDebounceEffect;
exports.useEventController = useEventController;
exports.useEventListener = useEventListener;
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
