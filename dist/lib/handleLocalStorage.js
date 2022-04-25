"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalStorage = exports.setLocalStorage = exports.getLocalStorage = void 0;
var handleData_1 = require("./handleData");
function getLocalStorage(c) {
    var ignoreUndefinedAndNull = c;
    if (!window.localStorage) {
        throw new Error("Browser don't support local storage.");
    }
    else {
        var storage = window.localStorage;
        var _ce = storage.getItem(ignoreUndefinedAndNull.toString());
        if (ignoreUndefinedAndNull && _ce) {
            try {
                var c_1 = JSON.parse(_ce);
                if (c_1.expired) {
                    if (new Date().getTime() > c_1.expired) {
                        c_1 = deleteLocalStorage(c_1);
                    }
                }
                return c_1 && c_1.value;
            }
            catch (e) {
                deleteLocalStorage(c);
                throw new Error('please use setLocalStorage and getLocalStorage to operate');
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
        throw new Error("Browser don't support local storage");
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
function setLocalStorageBase(c, v, d) {
    if (!window.localStorage) {
        throw new Error("Browser don't support local storage");
    }
    else {
        var storage = window.localStorage;
        if (v !== undefined) {
            var obj = {
                value: v,
                type: handleData_1.getType(v),
                expired: d && d + new Date().getTime()
            };
            if (!d) {
                delete obj.expired;
            }
            var value = JSON.stringify(obj);
            storage.setItem(c.toString(), value);
            return value;
        }
        else {
            return deleteLocalStorage(c);
        }
    }
}
function setLocalStorage(c, v, d) {
    if (typeof c === 'string') {
        return setLocalStorageBase(c, v, d);
    }
    else {
        if (!window.localStorage) {
            throw new Error("Browser don't support local storage");
        }
        else {
            var arr = Object.entries(c);
            if (arr.length) {
                arr.forEach(function (e) {
                    setLocalStorageBase(e[0], e[1], d);
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
