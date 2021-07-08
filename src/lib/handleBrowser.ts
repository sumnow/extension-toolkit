import { getCookie, setCookie } from './handleCookies'
import { getLocalStorage, setLocalStorage } from './handleLocalStorage'

type NativeFunc = {
    [key: string]: any
}
type AnyObject = {
    [key: string]: any
}
interface Ihandler {
    callHandler: (name: string, _param: any, func: (info: any) => void) => {}
    registerHandler: (name: string, func: (c: any) => void) => {}
}

type IWin = {
    WebViewJavascriptBridge?: Ihandler
    h5CallNative?: NativeFunc
}




type xSeriesConfig = {
    model: string,
    devicePixelRatio: number,
    width: number,
    height: number,
}

/**
 * source:      
 * isClient     
 * isWechat     
 * isPC         
 * screenWidth  
 * screenHeight 
 */
type SourceObj = {
    engine: string,
    engineVs: string,
    platform: string,
    supporter: string,
    supporterVs: string,
    system: string,
    systemVs: string,
    shell: string
    shellVs: string,

    host: string,
    platformOs: string,
    screenWidth: number,
    screenHeight: number,
    devicePixelRatio: number,
    model: string,
    ua: string,
}


// const getIPhoneConfig = (): string => {  // X XS, XS Max, XR
//     const xSeriesConfig = [
//         {
//             model: 'iPhone6',
//             width: 667,
//             height: 375,
//             devicePixelRatio: 1,
//         },
//         {
//             model: 'iPhone6Plus',
//             width: 960,
//             height: 540,
//             devicePixelRatio: 2,
//         },
//         { // x+xs+11
//             model: 'iPhoneX',
//             devicePixelRatio: 3,
//             width: 375,
//             height: 812,
//         },
//         { // xsmax+11promax
//             model: 'iPhoneXSMAX',
//             devicePixelRatio: 3,
//             width: 414,
//             height: 896,
//         },
//         { // xr+11
//             model: 'iPhoneXR',
//             devicePixelRatio: 2,
//             width: 414,
//             height: 896,
//         },
//     ];  // h5
//     if (typeof window !== 'undefined' && window) {
//         const { devicePixelRatio, screen } = window;
//         const { width, height } = screen;
//         const _arr = xSeriesConfig.filter(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height)
//         return _arr ? _arr[0].model : 'Unknown'
//     } else {
//         return 'Unknown'
//     }
// }

type BrowserObj = {
    engine: string,
    engineVs: string,
    platform: string,
    supporter: string,
    supporterVs: string,
    system: string,
    systemVs: string,
    shell: string
    shellVs: string
}


function BrowserType(): BrowserObj {
    // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
    const ua = navigator.userAgent.toLowerCase();
    const testUa = (reg: RegExp): Boolean => reg.test(ua);
    const testVs = (reg: RegExp): string => {
        const _s = ua.match(reg)
        return _s ? _s.toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".") : ''
    }
    // 系统
    let system = "unknow";
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
        system = "windows"; // windows系统
    } else if (testUa(/macintosh|macintel/g)) {
        system = "macos"; // macos系统
    } else if (testUa(/x11/g)) {
        system = "linux"; // linux系统
    } else if (testUa(/android|adr/g)) {
        system = "android"; // android系统
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
        system = "ios"; // ios系统
    }
    // 系统版本
    let systemVs = "unknow";
    if (system === "windows") {
        if (testUa(/windows nt 5.0|windows 2000/g)) {
            systemVs = "2000";
        } else if (testUa(/windows nt 5.1|windows xp/g)) {
            systemVs = "xp";
        } else if (testUa(/windows nt 5.2|windows 2003/g)) {
            systemVs = "2003";
        } else if (testUa(/windows nt 6.0|windows vista/g)) {
            systemVs = "vista";
        } else if (testUa(/windows nt 6.1|windows 7/g)) {
            systemVs = "7";
        } else if (testUa(/windows nt 6.2|windows 8/g)) {
            systemVs = "8";
        } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
            systemVs = "8.1";
        } else if (testUa(/windows nt 10.0|windows 10/g)) {
            systemVs = "10";
        }
    } else if (system === "macos") {
        systemVs = testVs(/os x [\d._]+/g);
    } else if (system === "android") {
        systemVs = testVs(/android [\d._]+/g);
    } else if (system === "ios") {
        systemVs = testVs(/os [\d._]+/g);
    }
    // 平台
    let platform = "unknow";
    if (system === "windows" || system === "macos" || system === "linux") {
        platform = "desktop"; // 桌面端
    } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
        platform = "mobile"; // 移动端
    }
    // 内核和载体
    let engine = "unknow";
    let supporter = "unknow";
    if (testUa(/applewebkit/g)) {
        engine = "webkit"; // webkit内核
        if (testUa(/edge/g)) {
            supporter = "edge"; // edge浏览器
        } else if (testUa(/opr/g)) {
            supporter = "opera"; // opera浏览器
        } else if (testUa(/chrome/g)) {
            supporter = "chrome"; // chrome浏览器
        } else if (testUa(/safari/g)) {
            supporter = "safari"; // safari浏览器
        }
    } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
        engine = "gecko"; // gecko内核
        supporter = "firefox"; // firefox浏览器
    } else if (testUa(/presto/g)) {
        engine = "presto"; // presto内核
        supporter = "opera"; // opera浏览器
    } else if (testUa(/trident|compatible|msie/g)) {
        engine = "trident"; // trident内核
        supporter = "iexplore"; // iexplore浏览器
    }




    // 内核版本
    let engineVs = "unknow";
    if (engine === "webkit") {
        engineVs = testVs(/applewebkit\/[\d._]+/g);
    } else if (engine === "gecko") {
        engineVs = testVs(/gecko\/[\d._]+/g);
    } else if (engine === "presto") {
        engineVs = testVs(/presto\/[\d._]+/g);
    } else if (engine === "trident") {
        engineVs = testVs(/trident\/[\d._]+/g);
    }




    // 载体版本
    let supporterVs = "unknow";
    if (supporter === "chrome") {
        supporterVs = testVs(/chrome\/[\d._]+/g);
    } else if (supporter === "safari") {
        supporterVs = testVs(/version\/[\d._]+/g);
    } else if (supporter === "firefox") {
        supporterVs = testVs(/firefox\/[\d._]+/g);
    } else if (supporter === "opera") {
        supporterVs = testVs(/opr\/[\d._]+/g);
    } else if (supporter === "iexplore") {
        supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
    } else if (supporter === "edge") {
        supporterVs = testVs(/edge\/[\d._]+/g);
    }
    // 外壳和外壳版本
    let shell = "none";
    let shellVs = "unknow";
    if (testUa(/micromessenger/g)) {
        shell = "wechat"; // 微信浏览器
        shellVs = testVs(/micromessenger\/[\d._]+/g);
    } else if (testUa(/qqbrowser/g)) {
        shell = "qq"; // QQ浏览器
        shellVs = testVs(/qqbrowser\/[\d._]+/g);
    } else if (testUa(/ucbrowser/g)) {
        shell = "uc"; // UC浏览器
        shellVs = testVs(/ucbrowser\/[\d._]+/g);
    } else if (testUa(/qihu 360se/g)) {
        shell = "360"; // 360浏览器(无版本)
    } else if (testUa(/2345explorer/g)) {
        shell = "2345"; // 2345浏览器
        shellVs = testVs(/2345explorer\/[\d._]+/g);
    } else if (testUa(/metasr/g)) {
        shell = "sougou"; // 搜狗浏览器(无版本)
    } else if (testUa(/lbbrowser/g)) {
        shell = "liebao"; // 猎豹浏览器(无版本)
    } else if (testUa(/maxthon/g)) {
        shell = "maxthon"; // 遨游浏览器
        shellVs = testVs(/maxthon\/[\d._]+/g);
    } else if (testUa(/weibo/g)) {
        shell = 'weibo'
    }
    return Object.assign({
        engine, // webkit gecko presto trident
        engineVs,
        platform, // desktop mobile
        supporter, // chrome safari firefox opera iexplore edge
        supporterVs,
        system, // windows macos linux android ios
        systemVs
    }, {
        shell, // wechat qq uc 360 2345 sougou liebao maxthon
        shellVs
    });
}


const setAppIdentifier = (str: string) => setLocalStorage('App_Identifier', str)

/**
 * return system info and browser info 
 */
function getClientInfo(): SourceObj {
    var x = 1;
    const wins: any = window;

    if (wins.devicePixelRatio) {
        x = wins.devicePixelRatio
    }
    const obj = {
        host: 'unknow',
        // phone or device : os version by platform
        platformOs: "unknow",
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        devicePixelRatio: x,
        model: 'Unknown',
    }
    const platform = window.navigator.platform
    const userAgent = navigator.userAgent.toLowerCase()
    const win = window as IWin

    // 小程序开发者工具
    if (/wechatdevtools/g.test(userAgent)) {
        obj.host = 'wechatdevtools';
    }

    if ((/miniprogram/g).test(userAgent)) {
        obj.host = 'miniprogram'
    }

    // if (/deji/g.test(userAgent)) {
    //     obj.host = 'deji'
    // } else if (win.h5CallNative) {
    //     obj.host = 'deji'
    // } else {
    if (/Win/g.test(platform)) {
        obj.platformOs = 'windows'
    } else if (/Mac/g.test(platform)) {
        obj.platformOs = 'mac'
    } else if (/iPhone/g.test(platform)) {
        obj.platformOs = 'ios'
    } else if (/Linux/g.test(platform)) {
        obj.platformOs = 'linux';
    } else if (/Android/g.test(platform)) {
        obj.platformOs = 'android'
    } else {
        obj.platformOs = 'unknow'
    }
    // }

    return Object.assign({ ua: userAgent }, BrowserType(), obj);
};


// for simulate different args in Chrome

const isDebug = (): boolean => {
    let isDebug: string | undefined = getUrlQueryMap(window.location.href).isDebug
    return isDebug === 'true' ? true : false
}

const isWechat = () => /wechat/g.test(getClientInfo().shell)

const isWeibo = () => /weibo/g.test(getClientInfo().shell)

const isMiniProgram = () => /miniprogram/g.test(getClientInfo().host)

const isWechatMP = () => isWechat() && isMiniProgram()

const isWechatDevtools = () => /wechatdevtools/g.test(getClientInfo().host)

const isPC = () => /desktop/g.test(getClientInfo().platform)

const isMobile = () => /mobile/g.test(getClientInfo().platform)


const isClient = (str?: string) => {
    if (!(window.location && window.location.href)) {
        console.warn('Current environment not support window.')
        return false
    }

    let clientDebug = getUrlQueryMap(window.location.href).isClient
    if (isDebug() && clientDebug) {
        console.log('Current mode is debug.')
        return JSON.parse(clientDebug)
    }
    let _str = str || getLocalStorage('App_Identifier') || undefined
    if (_str) {
        _str = _str.toLowerCase()
        if (/[a-z]+/g.test(_str)) {
            const reg = new RegExp(_str, 'g');
            return reg.test(getClientInfo().ua)
        } else {
            console.error('Illegal input')
            return false
        }
    } else {
        return false
    }
}

const isiOSApp = () => isClient() && /ios/g.test(getClientInfo().system)

const isAndroidApp = () => isClient() && /android/g.test(getClientInfo().system)

const registerNativeFun = (name: string, cb: (c: any) => {}) => {
    const win = window as IWin
    if (win.h5CallNative) {
        (win as any)[name] = cb;
    }
    if (win.WebViewJavascriptBridge) {
        win.WebViewJavascriptBridge.registerHandler(name, cb);
    }
    console.log(`[info] Register Native success: ${name}`);
}

/* Call Native Methods */
const transferNativeFun = (name: string, data: any, cb: (c: any) => {}) => {
    let _param = {
        ...(data || {})
    };
    console.log(`[info] Call Native method: ${name}, params: ${JSON.stringify(_param)}`);
    const win = window as IWin
    try {
        // IOS
        if (win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.callHandler) {
            win.WebViewJavascriptBridge.callHandler(name, _param, info => {
                info = info || {};
                cb && cb(info);
                console.log(`[info] Call Native success: ${name}`);
            });
            // android
        } else if (win.h5CallNative) {
            let res = "";
            if (Object.keys(_param).length === 0) {
                res = win.h5CallNative[name]();
            } else {
                res = win.h5CallNative[name](JSON.stringify(_param));
            }
            try {
                res = JSON.parse(res) || res;
            } catch (e) { }
            if (cb) {
                cb(res);
                console.log(`[info] Call Native success: ${name}`);
            } else {
                console.log(`[info] Call Native success: ${name}`);
                return res;
            }
        } else {
            cb && cb({});
            console.log(`[info] Call Native success: ${name}`);
        }
    } catch (e) {
        console.log(`[error] Call Native method ${name}: ${e}`);
    }
};




/**
 * Convert String to (Object)Location
 * href
 * protocol
 * username : ssh 
 * password : ssh
 * host
 * origin
 * hostname
 * port
 * pathname
 * search
 * hash
 * @param  {string} urlStr url
 * @return {object} Location
 */

function parseUrlAsLocation(urlStr: string): AnyObject {
    var pattern = RegExp("^(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?(#(?:.*))?");
    var matches = urlStr.match(pattern) || [];
    return {
        href: urlStr,
        protocol: matches[1] || '',
        username: matches[2] || '',
        password: matches[3] || '',
        host: `${matches[5] ? (matches[4] + ':' + matches[5]) : matches[4]}`,
        origin: `${matches[1] + '//' + matches[4] + (matches[5] ? ':' + matches[5] : '')}`,
        hostname: matches[4] || '',
        port: matches[5] || '',
        pathname: matches[6] || '',
        search: matches[7] || '',
        hash: matches[8] || ''
    };
}


/**
 * Parse params from url search,such as '?a=1' in 'http://www.example.com?a=1'
 * Used in History mode(Vue-router) or H5 history api. 
 * @param  {string} urlStr url
 * @return {object} return url Key-Value
 */
function getUrlQueryMapInHistory(urlStr: string): AnyObject {
    var url = parseUrlAsLocation(urlStr).search;
    const obj: AnyObject = {};
    if (url !== '?') {
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            const strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                const key = strs[i].split("=")[0] as string;
                obj[key] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
    }
    return obj;
}


/**
 * Parse params from url hash, such as '?a=1' in 'http://www.example.com#/index?a=1'
 * Used in Hash mode(Vue-router)
 * @param  {string} urlStr url
 * @return {object} return url Key-Value
 */
function getUrlQueryMapInHash(urlStr: string): AnyObject {
    const obj: AnyObject = {};
    var _hash = parseUrlAsLocation(urlStr).hash
    if (_hash.indexOf('?') > -1) {
        const _url = _hash.slice(_hash.indexOf('?'))
        if (_url !== '?') {
            if (_url.indexOf("?") != -1) {
                var str = _url.substr(1);
                const strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    const key = strs[i].split("=")[0] as string;
                    obj[key] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
        }
    }
    return obj;
}


/**
 * Parse params from url search and hash
 * @param  {string} urlStr url
 * @return {object} return url Key-Value
 */
function getUrlQueryMap(urlStr: string): AnyObject {
    var url = parseUrlAsLocation(urlStr).search;
    const obj: AnyObject = { ...getUrlQueryMapInHistory(urlStr), ...getUrlQueryMapInHash(urlStr) };
    return obj;
}



/**
 * Url compress object
 * @param  {string} urlStr     url link 
 * @param  {object} obj        object appended to url 
 * @return {string} url
 */
function generateUrlByQuery(urlStr: string, obj: object): string {
    const reg = /[[\-\_\.\!\~\*\(\)A-Za-z0-9]/g

    var ori = urlStr.split('?')[0]
    // var url = "?" + urlStr.split("?")[1];
    const _obj: { [key: string]: any } = {
        ...getUrlQueryMap(urlStr),
        ...obj,
    }
    Object.keys(_obj).forEach((e, i) => {
        const v = reg.test(_obj[e]) ? encodeURIComponent(_obj[e]) : _obj[e]
        i === 0 ? ori += `?${e}=${v}` : ori += `&${e}=${v}`
    })
    return ori
}

function replacePage(url: string, desc?: Object) {
    if (!!(window.history && history.replaceState)) {
        window.history.replaceState(
            desc,
            '',
            url
        );
    } else {
        location.replace(url);
    }
}


function needRefreshPage(desc: undefined | string) {
    if (getCookie("lastRPT")) {
        console.log(`has refreshed page because of ${desc}`);
    } else {
        // five second not refresh
        setCookie("lastRPT", 1, new Date(new Date().getTime() + 5000));
        console.log(`need refresh page because of ${desc}`);
        window.location.reload();
    }
}

function isSupportWebP() {
    const _s = getLocalStorage('sWP')
    if (_s) {
        if (_s === 1) {
            return false;
        }
        if (_s === 2) {
            return true;
        }
    } else {
        const supportsWebp = ({ createImageBitmap, Image }: { createImageBitmap: any, Image: any }) => {
            if (!createImageBitmap || !Image) return Promise.resolve(false);

            return new Promise(resolve => {
                const image = new Image();
                image.onload = () => {
                    createImageBitmap(image)
                        .then(() => {
                            resolve(true);
                        })
                        .catch(() => {
                            resolve(false);
                        });
                };
                image.onerror = () => {
                    resolve(false);
                };
                image.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
            });
        };

        const webpIsSupported = () => {
            let memo: any = null;
            return () => {
                if (!memo) {
                    memo = supportsWebp(window);
                }
                return memo;
            };
        };

        webpIsSupported()().then((res: boolean) => {
            setLocalStorage('sWP', res ? 2 : 1) // support webp
        }).catch((err: any) => {
            setLocalStorage('sWP', 1) // not support webp
            console.log(err)
        })
        return false;
    }

}



export {
    setAppIdentifier,
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
}
