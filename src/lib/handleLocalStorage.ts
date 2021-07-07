import { getType } from './handleData'

type StorageObj = {
    type: string,
    value: any
}

function getLocalStorage(c: string | null): any {
    const ignoreUndefinedAndNull: string = c!
    if (!window.localStorage) {
        throw new Error("Browser don't support local storage.");
    } else {
        const storage = window.localStorage;
        const _ce = storage.getItem(ignoreUndefinedAndNull.toString()) as string
        if (ignoreUndefinedAndNull && _ce) {
            if (_ce[0] === '{') {
                return JSON.parse(_ce).value
            } else {
                return _ce
            }
        } else {
            return undefined;
        }
    }
}

function deleteLocalStorage(c: string): undefined {
    if (!window.localStorage) {
        throw new Error("Browser don't support local storage");
    } else {
        const storage = window.localStorage;
        if (c) {
            storage.removeItem(c.toString());
            return undefined;
        } else {
            return undefined;
        }
    }
}


function setLocalStorageBase(c: string, v: any): any {
    if (!window.localStorage) {
        throw new Error("Browser don't support local storage");
    } else {
        const storage = window.localStorage;
        if (v !== undefined) {
            const obj: StorageObj = {
                value: v,
                type: getType(v)
            }
            const value = JSON.stringify(obj)
            storage.setItem(c.toString(), value);
            return value;
        } else {
            return deleteLocalStorage(c)
        }
    }
}

/**
 * Set localStorage as Key/Value
 * 
 * if type c is string
 * @param {string} c key
 * @param v 
 * 
 * if type c is object
 * @param {object} c object
 * @return undefined 
 */
function setLocalStorage(c: string | object, v: any): any {
    if (typeof c === 'string') {
        return setLocalStorageBase(c, v)
    } else {
        if (!window.localStorage) {
            throw new Error("Browser don't support local storage");
        } else {
            const arr = Object.entries(c)
            if (arr.length) {
                arr.forEach(e => {
                    setLocalStorageBase(e[0], e[1])
                })
                return undefined
            } else {
                return undefined
            }
        }
    }

}

export {
    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage,
}
