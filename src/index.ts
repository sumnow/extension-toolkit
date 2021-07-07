import cloneDeep from './lib/handleClone'
import {
    getCookie,
    setCookie,
    hasCookie,
    deleteCookie
} from './lib/handleCookies'
import {
    formatDate,
    timeSince
} from './lib/handleDate'
import {
    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage
} from './lib/handleLocalStorage'
import {
    getClientInfo,
    isWechat,
    isWeibo,
    isMiniProgram,
    isWechatMP,
    isWechatDevtools,
    isClient,
    isiOSApp,
    isAndroidApp,
    isPC,
    isMobile,

    transferNativeFun,
    registerNativeFun,

    parseUrlAsLocation,
    getUrlQueryMap,
    getUrlQueryMapInHistory,
    getUrlQueryMapInHash,
    generateUrlByQuery,

    replacePage,
    needRefreshPage,
    isSupportWebP,
} from './lib/handleBrowser'
import {
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

    traverseObj
} from './lib/handleData'
export {
    cloneDeep,

    // handleCookies
    getCookie,
    setCookie,
    hasCookie,
    deleteCookie,

    // handleDate
    formatDate,
    timeSince,

    // handleLocalStorage

    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage,

    // handleBrowser
    getClientInfo,
    isWechat,
    isWeibo,
    isMiniProgram,
    isWechatMP,
    isWechatDevtools,
    isClient,
    isiOSApp,
    isAndroidApp,
    isPC,
    isMobile,

    transferNativeFun,
    registerNativeFun,

    parseUrlAsLocation,
    getUrlQueryMap,
    getUrlQueryMapInHistory,
    getUrlQueryMapInHash,
    generateUrlByQuery,

    replacePage,
    needRefreshPage,
    isSupportWebP,

    // handleData
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

    traverseObj
}