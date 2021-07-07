import cloneDeep from "./handleClone";

type ObjectKV = {
    [key: string]: any
}

/**
 * get param type lowercase,such as number .etc
 * @param obj 
 */
function getType(obj: any): string {
    if (obj === null) {
        return 'null'; // PhantomJS has type "DOMWindow" for null
    } else if (obj === undefined) {
        return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
    } else {
        const _arr = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/) as string[]
        var type = _arr[1].toLowerCase();
        return type;
    }
}

/**
 * Filter same element in the array which fill with base type, 
 * such as number, etc. 
 * @param arr includes base type
 */
function generateSetFromBaseTypeArr<T>(arr: T[]): T[] {
    return Array.from(new Set(arr))
}

/**
 * Filter same element(must be object) by prop in array,
 * if object in array has same prop , it will be filter
 * @param arr includes object
 * @param prop filter key, prop in  object
 */
function generateSetFromObjectArr(arr: ObjectKV[], prop: string): ObjectKV[] {
    let hash: ObjectKV = {}
    const _arr = arr.reduce(function (item: ObjectKV, next: ObjectKV) {
        hash[next[prop]] ? '' : hash[next[prop]] = true && item.push(next);
        return item
    }, [])
    return _arr as ObjectKV[]
}

function generateSetFromArr(arr: [], prop?: string): any[] {
    if (prop) {
        return generateSetFromObjectArr(arr, prop)
    } else {
        return generateSetFromBaseTypeArr(arr)
    }
}

/**
 * @param val
 * @param num
 * @param array
 * fill Array with val until arr.length equal to num
 */
function generateFillArr(val: any, num: number, array: any[] = []): any[] {
    const _arr = array;
    let i = array.length;
    while (i < num) {
        i++;
        _arr.push(val)
    }
    return _arr
}

/**
 * determines whether the value is false or 'false'
 * @param s 
 */
const isTrue = (s: string | undefined): boolean => {
    if (s === 'false') {
        return true
    }
    return false
}

/**
 * determines whether the value is null or 'null' or '' 
 * or undefined or 'undefined'
 * @param val any
 * @returns 
 */
const isEmpty = (val: any): Boolean => {
    if (val === null || val === "null" || val === "" || val === undefined || val === "undefined") return true
    return false
}

/**
 * determines whether the val is empty object or not ,such as {}
 * @param val object
 */
const isEmptyObject = (val: object): boolean => {
    return Object.keys(val).length == 0
}

/**
 * determines whether the val is empty Array or not , such as []
 * @param val array
 */
const isEmptyArray = (val: []): boolean => {
    return isEmptyObject(val)
}

/**
 * Convert amount to upper case,such as 6 to '陆'
 * @param n string or number
 */
const MoneyCapital = (n: string) => {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
        return "数据非法";  //判断数据是否大于0
    }
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    var indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数
    if (indexpoint >= 0) {
        n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2);   // 若为小数，截取需要使用的unit单位
    }
    unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
    for (var i = 0; i < n.length; i++) {
        str += "零壹贰叁肆伍陆柒捌玖".charAt(parseInt(n.charAt(i))) + unit.charAt(i);  //遍历转化为大写的数字
    }
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整"); // 替换掉数字里面的零字符，得到结果
}

/**
 * tests whether all elements in the array 
 * pass the test implemented by the provided function. 
 * 
 * @param func callback (currentValue, index) 
 * @param array array
 * @returns boolean 
 */
const isAllPassInArray = function (func: (e: any, i: number, array: Array<Object>) => Boolean, array: Array<Object>): Boolean {
    const _arr = []
    for (let i = 0; i < array.length; i++) {
        if (!func(array[i], i, array)) {
            _arr.push(i)
        }
    }
    return !_arr.length
}

/**
 * tests whether at least one element in the array 
 * passes the testimplemented by the provided function. 
 * 
 * @param func callback (currentValue, index) 
 * @param array array
 * @returns boolean 
 */
const isHasPassInArray = function (func: (e: any, i: number, array: Array<Object>) => Boolean, array: Array<Object>): Boolean {
    const _arr = []
    for (let i = 0; i < array.length; i++) {
        if (!func(array[i], i, array)) {
            _arr.push(i)
        }
    }
    return _arr.length > 0
}

/**
 * push all param (base type) to an array
 * @param arg the first parameter
 * @param args rest of parameters
 */
const allParamInArray = function (arg: any, ...args: any[]): any[] {
    if (args.length == 0) {
        return arg
    } else {
        return [arg, ...args]
    }
}


/**
 * generate new Object which has all props
 * @param obj source object
 * @param props props array 
 * @returns 
 */
const selectPropsInObj = function (obj: ObjectKV, props: string[]): ObjectKV {
    const o: ObjectKV = {}
    props.forEach(e => {
        o[e] = obj[e]
    })
    return o
}


/**
 * generate new Object which not has any props
 * @param obj source object
 * @param props props array 
 * @returns 
 */
const filterPropsInObj = function (obj: ObjectKV, props: string[]): ObjectKV {
    const o: ObjectKV = {}
    const _keyArray = Object.keys(obj)
    props.forEach(e => {
        if (!_keyArray.includes(e)) {
            o[e] = obj[e]
        }
    })
    return o
}

function traverseObj(obj1: ObjectKV, func: (o: any, i: string, _obj: ObjectKV) => {}, notDeep: boolean = false) {
    let obj = obj1 || {}
    let _obj: ObjectKV = {}
    _obj = notDeep ? obj : cloneDeep(obj)
    const _arr = Object.keys(_obj)
    if (_arr.length != 0) {
        for (let i of _arr) {
            // traverse object
            if (getType(_obj[i]) === 'object' || getType(_obj[i]) === 'array') {
                traverseObj(obj[i], func, true);
            } else {
                func(_obj[i], i, _obj)
            }
        }
    }

}

export {
    getType,

    generateSetFromBaseTypeArr,
    generateSetFromObjectArr,
    generateSetFromArr,

    isTrue,
    isEmpty,
    isEmptyObject,
    isEmptyArray,

    MoneyCapital,

    isAllPassInArray,
    isHasPassInArray,

    selectPropsInObj,
    filterPropsInObj,

    traverseObj,
}