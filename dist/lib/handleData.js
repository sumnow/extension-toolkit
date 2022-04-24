"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseObj = exports.filterPropsInObj = exports.selectPropsInObj = exports.isHasPassInArray = exports.isAllPassInArray = exports.MoneyCapital = exports.isEmptyArray = exports.isEmptyObject = exports.isEmpty = exports.isTrue = exports.generateFillArr = exports.generateSetFromArr = exports.generateSetFromObjectArr = exports.generateSetFromBaseTypeArr = exports.getType = void 0;
var handleClone_1 = require("./handleClone");
function getType(obj) {
    if (obj === null) {
        return 'null';
    }
    else if (obj === undefined) {
        return 'undefined';
    }
    else {
        var _arr = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/);
        var type = _arr[1].toLowerCase();
        return type;
    }
}
exports.getType = getType;
function generateSetFromBaseTypeArr(arr) {
    return Array.from(new Set(arr));
}
exports.generateSetFromBaseTypeArr = generateSetFromBaseTypeArr;
function generateSetFromObjectArr(arr, prop) {
    var hash = {};
    var _arr = arr.reduce(function (item, next) {
        hash[next[prop]] ? '' : hash[next[prop]] = true && item.push(next);
        return item;
    }, []);
    return _arr;
}
exports.generateSetFromObjectArr = generateSetFromObjectArr;
function generateSetFromArr(arr, prop) {
    if (prop) {
        return generateSetFromObjectArr(arr, prop);
    }
    else {
        return generateSetFromBaseTypeArr(arr);
    }
}
exports.generateSetFromArr = generateSetFromArr;
function generateFillArr(val, num, array) {
    if (array === void 0) { array = []; }
    var _arr = array;
    var i = array.length;
    while (i < num) {
        i++;
        _arr.push(val);
    }
    return _arr;
}
exports.generateFillArr = generateFillArr;
var isTrue = function (s) {
    if (s === 'false') {
        return true;
    }
    return false;
};
exports.isTrue = isTrue;
var isEmpty = function (val) {
    if (val === null || val === "null" || val === "" || val === undefined || val === "undefined")
        return true;
    return false;
};
exports.isEmpty = isEmpty;
var isEmptyObject = function (val) {
    return Object.keys(val).length == 0;
};
exports.isEmptyObject = isEmptyObject;
var isEmptyArray = function (val) {
    return isEmptyObject(val);
};
exports.isEmptyArray = isEmptyArray;
var MoneyCapital = function (n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
        return "数据非法";
    }
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    var indexpoint = n.indexOf('.');
    if (indexpoint >= 0) {
        n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2);
    }
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++) {
        str += "零壹贰叁肆伍陆柒捌玖".charAt(parseInt(n.charAt(i))) + unit.charAt(i);
    }
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
};
exports.MoneyCapital = MoneyCapital;
var isAllPassInArray = function (func, array) {
    var _arr = [];
    for (var i = 0; i < array.length; i++) {
        if (!func(array[i], i, array)) {
            _arr.push(i);
        }
    }
    return !_arr.length;
};
exports.isAllPassInArray = isAllPassInArray;
var isHasPassInArray = function (func, array) {
    var _arr = [];
    for (var i = 0; i < array.length; i++) {
        if (!func(array[i], i, array)) {
            _arr.push(i);
        }
    }
    return _arr.length > 0;
};
exports.isHasPassInArray = isHasPassInArray;
var allParamInArray = function (arg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (args.length == 0) {
        return arg;
    }
    else {
        return __spreadArrays([arg], args);
    }
};
var selectPropsInObj = function (obj, props) {
    var o = {};
    props.forEach(function (e) {
        o[e] = obj[e];
    });
    return o;
};
exports.selectPropsInObj = selectPropsInObj;
var filterPropsInObj = function (obj, props) {
    var o = {};
    var _keyArray = Object.keys(obj);
    props.forEach(function (e) {
        if (!_keyArray.includes(e)) {
            o[e] = obj[e];
        }
    });
    return o;
};
exports.filterPropsInObj = filterPropsInObj;
function traverseObj(obj1, func, notDeep) {
    if (notDeep === void 0) { notDeep = false; }
    var obj = obj1 || {};
    var _obj = {};
    _obj = notDeep ? obj : handleClone_1.default(obj);
    var _arr = Object.keys(_obj);
    if (_arr.length != 0) {
        for (var _i = 0, _arr_1 = _arr; _i < _arr_1.length; _i++) {
            var i = _arr_1[_i];
            if (getType(_obj[i]) === 'object' || getType(_obj[i]) === 'array') {
                traverseObj(obj[i], func, true);
            }
            else {
                func(_obj[i], i, _obj);
            }
        }
    }
}
exports.traverseObj = traverseObj;
