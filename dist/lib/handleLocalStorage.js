"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalStorage = exports.setLocalStorage = exports.getLocalStorage = void 0;
var handleData_1 = require("./handleData");
function getLocalStorage(c) {
    var ignoreUndefinedAndNull = c;
    if (!window.localStorage) {
        throw new Error("浏览器不支持localstorage");
    }
    else {
        var storage = window.localStorage;
        var _ce = storage.getItem(ignoreUndefinedAndNull.toString());
        if (ignoreUndefinedAndNull && _ce) {
            if (_ce[0] === '{') {
                return JSON.parse(_ce).value;
            }
            else {
                return _ce;
            }
        }
        else {
            return undefined;
        }
    }
}
exports.getLocalStorage = getLocalStorage;
function deleteLocalStorage(c) {
    if (!window.localStorage) {
        throw new Error("Browser don't support localstorage");
    }
    else {
        var storage = window.localStorage;
        if (c) {
            storage.removeItem(c.toString());
            return undefined;
        }
        else {
            return undefined;
        }
    }
}
exports.deleteLocalStorage = deleteLocalStorage;
function setLocalStorageBase(c, v) {
    if (!window.localStorage) {
        throw new Error("Browser don't support localstorage");
    }
    else {
        var storage = window.localStorage;
        if (v !== undefined) {
            var obj = {
                value: v,
                type: handleData_1.getType(v)
            };
            var value = JSON.stringify(obj);
            storage.setItem(c.toString(), value);
            return value;
        }
        else {
            return deleteLocalStorage(c);
        }
    }
}
function setLocalStorage(c, v) {
    if (typeof c === 'string') {
        return setLocalStorageBase(c, v);
    }
    else {
        if (!window.localStorage) {
            throw new Error("Browser don't support localstorage");
        }
        else {
            var arr = Object.entries(c);
            if (arr.length) {
                arr.forEach(function (e) {
                    setLocalStorageBase(e[0], e[1]);
                });
                return undefined;
            }
            else {
                return undefined;
            }
        }
    }
}
exports.setLocalStorage = setLocalStorage;
