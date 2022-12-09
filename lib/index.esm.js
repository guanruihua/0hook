import { useState, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function useRequest(service, config) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [manual, setManual] = useState(!!config && config.manual);
    function start() {
        return __awaiter(this, void 0, void 0, function* () {
            // if (type(service) !== 'Function') return
            try {
                const result = yield service();
                setData(result);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        });
    }
    if (!manual) {
        start();
    }
    return { data, error, loading };
}

function useForm() {
}

function useSetState(initialState = {}) {
    const [state, setState] = useState(initialState);
    return [
        state,
        (patch) => {
            if (typeof patch === 'function') {
                setState(Object.assign(Object.assign({}, state), patch(state)));
            }
            else {
                setState(Object.assign(Object.assign({}, state), patch));
            }
        }
    ];
}

function useStorage(key, options) {
    const _a = options || {}, { defaultValue } = _a, restOptions = __rest(_a, ["defaultValue"]);
    const loVal = getStorage(key, options);
    useEffect(() => {
        getStorage(key, Object.assign({ defaultValue }, restOptions));
    }, []);
    const [val, _setVal] = useState(loVal);
    function setVal(newVal) {
        _setVal(newVal);
        setStorage(key, Object.assign({ value: newVal }, restOptions));
    }
    return [val, setVal];
}
function getStorage(key, options) {
    const { defaultValue, parse = true, storage = localStorage } = options || {};
    if (storage.getItem(key) === null) {
        if (parse) {
            storage.setItem(key, JSON.stringify(defaultValue));
        }
        else if (typeof defaultValue === 'string')
            storage.setItem(key, defaultValue);
    }
    try {
        const result = localStorage.getItem(key);
        if (result === null)
            return defaultValue;
        if (parse)
            return JSON.parse(result || JSON.stringify(defaultValue));
        return result;
    }
    catch (_a) {
        return defaultValue;
    }
}
function setStorage(key, options) {
    const { value, parse = true, storage = localStorage } = options || {};
    try {
        if (parse) {
            storage.setItem(key, JSON.stringify(value));
            return true;
        }
        else {
            if (typeof value === 'string') {
                storage.setItem(key, value);
                return true;
            }
        }
        return false;
    }
    catch (_a) {
        return false;
    }
}

function getLocalStorage(key, options) {
    return getStorage(key, Object.assign({ storage: localStorage }, options));
}
function setLocalStorage(key, options) {
    return setStorage(key, Object.assign({ storage: localStorage }, options));
}
function useLocalStorage(key, options) {
    return useStorage(key, Object.assign({ storage: localStorage }, options));
}
function getSessionStorage(key, options) {
    return getStorage(key, Object.assign({ storage: sessionStorage }, options));
}
function setSessionStorage(key, options) {
    return setStorage(key, Object.assign({ storage: sessionStorage }, options));
}
function useSessionStorage(key, options) {
    return useStorage(key, Object.assign({ storage: sessionStorage }, options));
}

export { getLocalStorage, getSessionStorage, getStorage, setLocalStorage, setSessionStorage, setStorage, useForm, useLocalStorage, useRequest, useSessionStorage, useSetState, useStorage };
//# sourceMappingURL=index.esm.js.map
