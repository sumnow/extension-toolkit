"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasOwnProperty = Object.prototype.hasOwnProperty;
var getType = Object.prototype.toString;
function initCloneArray(array) {
    var length = array.length;
    var result = new array.constructor(length);
    if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
    }
    return result;
}
function getKeysFunc(isFull) {
    function getSymbols(object) {
        if (object == null) {
            return [];
        }
        object = Object(object);
        return Object
            .getOwnPropertySymbols(object)
            .filter(function (symbol) { return Object.prototype.propertyIsEnumerable.call(object, symbol); });
    }
    function isLength(value) {
        return typeof value === 'number' &&
            value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
    }
    function isArrayLike(value) {
        return value != null && typeof value !== 'function' && isLength(value.length);
    }
    function isIndex(value, length) {
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var type = typeof value;
        length = length == null ? Number.MAX_SAFE_INTEGER : length;
        return !!length &&
            (type === 'number' ||
                (type !== 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 === 0 && value < length);
    }
    function isArguments(value) {
        return typeof value === 'object' && value !== null && getType.call(value) === '[object Arguments]';
    }
    function arrayLikeKeys(value, inherited) {
        var isArr = Array.isArray(value);
        var isArg = !isArr && isArguments(value);
        var skipIndexes = isArr || isArg;
        var length = value.length;
        var result = new Array(skipIndexes ? length : 0);
        var index = skipIndexes ? -1 : length;
        while (++index < length) {
            result[index] = "" + index;
        }
        for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) &&
                !(skipIndexes && ((key === 'length' ||
                    isIndex(key, length))))) {
                result.push(key);
            }
        }
        return result;
    }
    function keys(object) {
        return isArrayLike(object)
            ? arrayLikeKeys(object)
            : Object.keys(Object(object));
    }
    function getAllKeys(object) {
        var result = keys(object);
        if (!Array.isArray(object)) {
            result.push.apply(result, getSymbols(object));
        }
        return result;
    }
    return isFull
        ? getAllKeys
        : keys;
}
function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, regexp.flags);
    result.lastIndex = regexp.lastIndex;
    return result;
}
function cloneArguments(args) {
    var result = (function () { return arguments; })();
    result.callee = args.callee;
    result.length = args.length;
    return result;
}
var cloneDeep = function (target, isFull, cache, parent) {
    if (isFull === void 0) { isFull = true; }
    if (cache === void 0) { cache = new WeakMap(); }
    if (parent === void 0) { parent = undefined; }
    var undefinedTag = '[object Undefined]';
    var nullTag = '[object Null]';
    var boolTag = '[object Boolean]';
    var numberTag = '[object Number]';
    var stringTag = '[object String]';
    var symbolTag = '[object Symbol]';
    var bigIntTag = '[object BigInt]';
    var arrayTag = '[object Array]';
    var objectTag = '[object Object]';
    var setTag = '[object Set]';
    var mapTag = '[object Map]';
    var argTag = '[object Arguments]';
    var regexpTag = '[object RegExp]';
    var dateTag = '[object Date]';
    var funcTag = '[object Function]';
    var promiseTag = '[object Promise]';
    var weakMapTag = '[object WeakMap]';
    var weakSetTag = '[object WeakSet]';
    var errorTag = '[object Error]';
    var type = getType.call(target);
    var allTypes = [
        undefinedTag, nullTag, boolTag, numberTag, stringTag, symbolTag, bigIntTag, arrayTag, objectTag,
        setTag, mapTag, argTag, regexpTag, dateTag, funcTag, promiseTag,
        weakMapTag, weakSetTag, errorTag
    ];
    if (!allTypes.includes(type)) {
        console.warn("\u4E0D\u652F\u6301" + type + "\u7C7B\u578B\u7684\u62F7\u8D1D\uFF0C\u8FD4\u56DE{}\u3002");
        return {};
    }
    var valTypes = [
        undefinedTag, nullTag, boolTag, numberTag, stringTag, symbolTag, bigIntTag
    ];
    if (valTypes.includes(type)) {
        return target;
    }
    function forEach(array, iteratee) {
        var index = -1;
        var length = array.length;
        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break;
            }
        }
        return array;
    }
    var cloneTarget;
    if (Array.isArray(target)) {
        cloneTarget = initCloneArray(target);
    }
    else {
        switch (type) {
            case argTag:
                cloneTarget = cloneArguments(target);
                break;
            case regexpTag:
                cloneTarget = cloneRegExp(target);
                break;
            case dateTag:
                cloneTarget = new target.constructor(+target);
                break;
            case funcTag:
                cloneTarget = parent ? target : {};
                break;
            case promiseTag:
                cloneTarget = target.then();
                break;
            case weakMapTag:
            case weakSetTag:
            case errorTag:
                !parent && console.warn(type + "\u7C7B\u578B\u65E0\u6CD5\u62F7\u8D1D\uFF0C\u8FD4\u56DE{}\u3002");
                cloneTarget = parent ? target : {};
                break;
            default:
                cloneTarget = new target.constructor();
        }
    }
    if (cache.has(target)) {
        return cache.get(target);
    }
    cache.set(target, cloneTarget);
    if (type === setTag) {
        target.forEach(function (value) {
            cloneTarget.add(cloneDeep(value, cache, undefined, undefined));
        });
        return cloneTarget;
    }
    if (type === mapTag) {
        target.forEach(function (value, key) {
            cloneTarget.set(key, cloneDeep(value, cache, undefined, undefined));
        });
        return cloneTarget;
    }
    var keysFunc = getKeysFunc(isFull);
    var keys = type === arrayTag ? undefined : keysFunc(target);
    forEach(keys || target, function (value, key) {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = cloneDeep(target[key], isFull, cache, target);
    });
    return cloneTarget;
};
exports.default = cloneDeep;
