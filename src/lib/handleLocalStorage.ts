import { getType } from './handleData'

/**
 *  This is storage Tool
 * 
 */

type StorageObj = {
    type: string,
    value: any,
    expired?: number
}

/**
 * This function will check weather K-V is expired or not,
 * if had expired , it will delete K-V and return undefined.
 * @param c get local storage's key
 * @returns value or undefined or Error
 */
function getLocalStorage(c: string | null): any {
    const ignoreUndefinedAndNull: string = c!
    if (!window.localStorage) {
        throw new Error("Browser don't support local storage.");
    } else {
        const storage = window.localStorage;
        const _ce = storage.getItem(ignoreUndefinedAndNull.toString()) as string
        if (ignoreUndefinedAndNull && _ce) {
            try {
                let c = JSON.parse(_ce);
                if (c.expired) {
                    if (new Date().getTime() > c.expired) {
                        // delete expired data
                        c = deleteLocalStorage(c!);
                    }
                }
                return c && c.value;
            } catch (e) {
                deleteLocalStorage(c!);
                throw new Error('please use setLocalStorage and getLocalStorage to operate');
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

/**
 * Set K-V into storage
 * @param c storage key
 * @param v storage value
 * @param d storage expired time
 * @returns 
 */

function setLocalStorageBase(c: string, v: any, d?: number): any {
    if (!window.localStorage) {
        throw new Error("Browser don't support local storage");
    } else {
        const storage = window.localStorage;
        if (v !== undefined) {
            const obj: StorageObj = {
                value: v,
                type: getType(v),
                expired: d && d + new Date().getTime()
            }
            if (!d) {
                delete obj.expired;
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
 * @param v value 
 * @param d expired 
 * 
 * if type c is object
 * @param {object} c object
 * @param v expired 
 * 
 * @return undefined 
 */
function setLocalStorage(c: string | object, v?: any, d?: number): any {
    if (typeof c === 'string') {
        return setLocalStorageBase(c, v, d);
    } else {
        if (!window.localStorage) {
            throw new Error("Browser don't support local storage");
        } else {
            const arr = Object.entries(c);
            if (arr.length) {
                arr.forEach(e => {
                    setLocalStorageBase(e[0], e[1], d!)
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
