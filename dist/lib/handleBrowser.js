"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportWebP = exports.needRefreshPage = exports.replacePage = exports.generateUrlByQuery = exports.getUrlQueryMapInHash = exports.getUrlQueryMapInHistory = exports.getUrlQueryMap = exports.parseUrlAsLocation = exports.registerNativeFun = exports.transferNativeFun = exports.isMobile = exports.isPC = exports.isAndroidApp = exports.isiOSApp = exports.isClient = exports.isWechatDevtools = exports.isWechatMP = exports.isMiniProgram = exports.isWeibo = exports.isWechat = exports.getClientInfo = void 0;
var handleCookies_1 = require("./handleCookies");
var handleLocalStorage_1 = require("./handleLocalStorage");
function BrowserType() {
    var ua = navigator.userAgent.toLowerCase();
    var testUa = function (reg) { return reg.test(ua); };
    var testVs = function (reg) {
        var _s = ua.match(reg);
        return _s ? _s.toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".") : '';
    };
    var system = "unknow";
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
        system = "windows";
    }
    else if (testUa(/macintosh|macintel/g)) {
        system = "macos";
    }
    else if (testUa(/x11/g)) {
        system = "linux";
    }
    else if (testUa(/android|adr/g)) {
        system = "android";
    }
    else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
        system = "ios";
    }
    var systemVs = "unknow";
    if (system === "windows") {
        if (testUa(/windows nt 5.0|windows 2000/g)) {
            systemVs = "2000";
        }
        else if (testUa(/windows nt 5.1|windows xp/g)) {
            systemVs = "xp";
        }
        else if (testUa(/windows nt 5.2|windows 2003/g)) {
            systemVs = "2003";
        }
        else if (testUa(/windows nt 6.0|windows vista/g)) {
            systemVs = "vista";
        }
        else if (testUa(/windows nt 6.1|windows 7/g)) {
            systemVs = "7";
        }
        else if (testUa(/windows nt 6.2|windows 8/g)) {
            systemVs = "8";
        }
        else if (testUa(/windows nt 6.3|windows 8.1/g)) {
            systemVs = "8.1";
        }
        else if (testUa(/windows nt 10.0|windows 10/g)) {
            systemVs = "10";
        }
    }
    else if (system === "macos") {
        systemVs = testVs(/os x [\d._]+/g);
    }
    else if (system === "android") {
        systemVs = testVs(/android [\d._]+/g);
    }
    else if (system === "ios") {
        systemVs = testVs(/os [\d._]+/g);
    }
    var platform = "unknow";
    if (system === "windows" || system === "macos" || system === "linux") {
        platform = "desktop";
    }
    else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
        platform = "mobile";
    }
    var engine = "unknow";
    var supporter = "unknow";
    if (testUa(/applewebkit/g)) {
        engine = "webkit";
        if (testUa(/edge/g)) {
            supporter = "edge";
        }
        else if (testUa(/opr/g)) {
            supporter = "opera";
        }
        else if (testUa(/chrome/g)) {
            supporter = "chrome";
        }
        else if (testUa(/safari/g)) {
            supporter = "safari";
        }
    }
    else if (testUa(/gecko/g) && testUa(/firefox/g)) {
        engine = "gecko";
        supporter = "firefox";
    }
    else if (testUa(/presto/g)) {
        engine = "presto";
        supporter = "opera";
    }
    else if (testUa(/trident|compatible|msie/g)) {
        engine = "trident";
        supporter = "iexplore";
    }
    var engineVs = "unknow";
    if (engine === "webkit") {
        engineVs = testVs(/applewebkit\/[\d._]+/g);
    }
    else if (engine === "gecko") {
        engineVs = testVs(/gecko\/[\d._]+/g);
    }
    else if (engine === "presto") {
        engineVs = testVs(/presto\/[\d._]+/g);
    }
    else if (engine === "trident") {
        engineVs = testVs(/trident\/[\d._]+/g);
    }
    var supporterVs = "unknow";
    if (supporter === "chrome") {
        supporterVs = testVs(/chrome\/[\d._]+/g);
    }
    else if (supporter === "safari") {
        supporterVs = testVs(/version\/[\d._]+/g);
    }
    else if (supporter === "firefox") {
        supporterVs = testVs(/firefox\/[\d._]+/g);
    }
    else if (supporter === "opera") {
        supporterVs = testVs(/opr\/[\d._]+/g);
    }
    else if (supporter === "iexplore") {
        supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
    }
    else if (supporter === "edge") {
        supporterVs = testVs(/edge\/[\d._]+/g);
    }
    var shell = "none";
    var shellVs = "unknow";
    if (testUa(/micromessenger/g)) {
        shell = "wechat";
        shellVs = testVs(/micromessenger\/[\d._]+/g);
    }
    else if (testUa(/qqbrowser/g)) {
        shell = "qq";
        shellVs = testVs(/qqbrowser\/[\d._]+/g);
    }
    else if (testUa(/ucbrowser/g)) {
        shell = "uc";
        shellVs = testVs(/ucbrowser\/[\d._]+/g);
    }
    else if (testUa(/qihu 360se/g)) {
        shell = "360";
    }
    else if (testUa(/2345explorer/g)) {
        shell = "2345";
        shellVs = testVs(/2345explorer\/[\d._]+/g);
    }
    else if (testUa(/metasr/g)) {
        shell = "sougou";
    }
    else if (testUa(/lbbrowser/g)) {
        shell = "liebao";
    }
    else if (testUa(/maxthon/g)) {
        shell = "maxthon";
        shellVs = testVs(/maxthon\/[\d._]+/g);
    }
    else if (testUa(/weibo/g)) {
        shell = 'weibo';
    }
    return Object.assign({
        engine: engine,
        engineVs: engineVs,
        platform: platform,
        supporter: supporter,
        supporterVs: supporterVs,
        system: system,
        systemVs: systemVs
    }, {
        shell: shell,
        shellVs: shellVs
    });
}
function getClientInfo() {
    var x = 1;
    var wins = window;
    if (wins.devicePixelRatio) {
        x = wins.devicePixelRatio;
    }
    var obj = {
        host: 'unknow',
        platformOs: "unknow",
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        devicePixelRatio: x,
        model: 'Unknown',
    };
    var platform = window.navigator.platform;
    var userAgent = navigator.userAgent.toLowerCase();
    var win = window;
    if (/wechatdevtools/g.test(userAgent)) {
        obj.host = 'wechatdevtools';
    }
    if (/miniprogram/g.test(userAgent)) {
        obj.host = 'miniprogram';
    }
    if (/deji/g.test(userAgent)) {
        obj.host = 'deji';
    }
    else if (win.h5CallNative) {
        obj.host = 'deji';
    }
    else {
        if (/Win/g.test(platform)) {
            obj.platformOs = 'windows';
        }
        else if (/Mac/g.test(platform)) {
            obj.platformOs = 'mac';
        }
        else if (/iPhone/g.test(platform)) {
            obj.platformOs = 'ios';
        }
        else if (/Linux/g.test(platform)) {
            obj.platformOs = 'linux';
        }
        else if (/Android/g.test(platform)) {
            obj.platformOs = 'android';
        }
        else {
            obj.platformOs = 'unknow';
        }
    }
    return Object.assign({ ua: userAgent }, BrowserType(), obj);
}
exports.getClientInfo = getClientInfo;
;
var isDebug = function () {
    var isDebug = getUrlQueryMap(window.location.href).isDebug;
    return isDebug === 'true' ? true : false;
};
var isWechat = function () { return /wechat/g.test(getClientInfo().shell); };
exports.isWechat = isWechat;
var isWeibo = function () { return /weibo/g.test(getClientInfo().shell); };
exports.isWeibo = isWeibo;
var isMiniProgram = function () { return /miniprogram/g.test(getClientInfo().host); };
exports.isMiniProgram = isMiniProgram;
var isWechatMP = function () { return isWechat() && isMiniProgram(); };
exports.isWechatMP = isWechatMP;
var isWechatDevtools = function () { return /wechatdevtools/g.test(getClientInfo().host); };
exports.isWechatDevtools = isWechatDevtools;
var isPC = function () { return /desktop/g.test(getClientInfo().platform); };
exports.isPC = isPC;
var isMobile = function () { return /mobile/g.test(getClientInfo().platform); };
exports.isMobile = isMobile;
var isClient = function (str) {
    var _str = str || handleLocalStorage_1.getLocalStorage('App_Identifier') || undefined;
    if (/\s+/g.test(_str)) {
    }
    var clientDebug = getUrlQueryMap(window.location.href).isClient;
    if (isDebug() && clientDebug) {
        return JSON.parse(clientDebug);
    }
    if (_str) {
        var reg = new RegExp(_str, 'g');
        return reg.test(getClientInfo().ua);
    }
    else {
        return false;
    }
};
exports.isClient = isClient;
var isiOSApp = function () { return isClient() && /ios/g.test(getClientInfo().system); };
exports.isiOSApp = isiOSApp;
var isAndroidApp = function () { return isClient() && /android/g.test(getClientInfo().system); };
exports.isAndroidApp = isAndroidApp;
var registerNativeFun = function (name, cb) {
    var win = window;
    if (win.h5CallNative) {
        win[name] = cb;
    }
    if (win.WebViewJavascriptBridge) {
        win.WebViewJavascriptBridge.registerHandler(name, cb);
    }
    console.log("[info] Register Native success: " + name);
};
exports.registerNativeFun = registerNativeFun;
var transferNativeFun = function (name, data, cb) {
    var _param = __assign({}, (data || {}));
    console.log("[info] Call Native method: " + name + ", params: " + JSON.stringify(_param));
    var win = window;
    try {
        if (win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.callHandler) {
            win.WebViewJavascriptBridge.callHandler(name, _param, function (info) {
                info = info || {};
                cb && cb(info);
                console.log("[info] Call Native success: " + name);
            });
        }
        else if (win.h5CallNative) {
            var res = "";
            if (Object.keys(_param).length === 0) {
                res = win.h5CallNative[name]();
            }
            else {
                res = win.h5CallNative[name](JSON.stringify(_param));
            }
            try {
                res = JSON.parse(res) || res;
            }
            catch (e) { }
            if (cb) {
                cb(res);
                console.log("[info] Call Native success: " + name);
            }
            else {
                console.log("[info] Call Native success: " + name);
                return res;
            }
        }
        else {
            cb && cb({});
            console.log("[info] Call Native success: " + name);
        }
    }
    catch (e) {
        console.log("[error] Call Native method " + name + ": " + e);
    }
};
exports.transferNativeFun = transferNativeFun;
function parseUrlAsLocation(urlStr) {
    var pattern = RegExp("^(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?(#(?:.*))?");
    var matches = urlStr.match(pattern) || [];
    return {
        href: urlStr,
        protocol: matches[1] || '',
        username: matches[2] || '',
        password: matches[3] || '',
        host: "" + (matches[5] ? (matches[4] + ':' + matches[5]) : matches[4]),
        origin: "" + (matches[1] + '//' + matches[4] + (matches[5] ? ':' + matches[5] : '')),
        hostname: matches[4] || '',
        port: matches[5] || '',
        pathname: matches[6] || '',
        search: matches[7] || '',
        hash: matches[8] || ''
    };
}
exports.parseUrlAsLocation = parseUrlAsLocation;
function getUrlQueryMapInHistory(urlStr) {
    var url = parseUrlAsLocation(urlStr).search;
    var obj = {};
    if (url !== '?') {
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var key = strs[i].split("=")[0];
                obj[key] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
    }
    return obj;
}
exports.getUrlQueryMapInHistory = getUrlQueryMapInHistory;
function getUrlQueryMapInHash(urlStr) {
    var obj = {};
    var _hash = parseUrlAsLocation(urlStr).hash;
    if (_hash.indexOf('?') > -1) {
        var _url = _hash.slice(_hash.indexOf('?'));
        if (_url !== '?') {
            if (_url.indexOf("?") != -1) {
                var str = _url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    var key = strs[i].split("=")[0];
                    obj[key] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
        }
    }
    return obj;
}
exports.getUrlQueryMapInHash = getUrlQueryMapInHash;
function getUrlQueryMap(urlStr) {
    var url = parseUrlAsLocation(urlStr).search;
    var obj = __assign(__assign({}, getUrlQueryMapInHistory(urlStr)), getUrlQueryMapInHash(urlStr));
    return obj;
}
exports.getUrlQueryMap = getUrlQueryMap;
function generateUrlByQuery(urlStr, obj) {
    var reg = /[[\-\_\.\!\~\*\(\)A-Za-z0-9]/g;
    var ori = urlStr.split('?')[0];
    var _obj = __assign(__assign({}, getUrlQueryMap(urlStr)), obj);
    Object.keys(_obj).forEach(function (e, i) {
        var v = reg.test(_obj[e]) ? encodeURIComponent(_obj[e]) : _obj[e];
        i === 0 ? ori += "?" + e + "=" + v : ori += "&" + e + "=" + v;
    });
    return ori;
}
exports.generateUrlByQuery = generateUrlByQuery;
function replacePage(url, desc) {
    if (!!(window.history && history.replaceState)) {
        window.history.replaceState(desc, '', url);
    }
    else {
        location.replace(url);
    }
}
exports.replacePage = replacePage;
function needRefreshPage(desc) {
    if (handleCookies_1.getCookie("lastRPT")) {
        console.log("has refreshed page because of " + desc);
    }
    else {
        handleCookies_1.setCookie("lastRPT", 1, new Date(new Date().getTime() + 5000));
        console.log("need refresh page because of " + desc);
        window.location.reload();
    }
}
exports.needRefreshPage = needRefreshPage;
function isSupportWebP() {
    var _s = handleLocalStorage_1.getLocalStorage('sWP');
    if (_s) {
        if (_s === 1) {
            return false;
        }
        if (_s === 2) {
            return true;
        }
    }
    else {
        var supportsWebp_1 = function (_a) {
            var createImageBitmap = _a.createImageBitmap, Image = _a.Image;
            if (!createImageBitmap || !Image)
                return Promise.resolve(false);
            return new Promise(function (resolve) {
                var image = new Image();
                image.onload = function () {
                    createImageBitmap(image)
                        .then(function () {
                        resolve(true);
                    })
                        .catch(function () {
                        resolve(false);
                    });
                };
                image.onerror = function () {
                    resolve(false);
                };
                image.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
            });
        };
        var webpIsSupported = function () {
            var memo = null;
            return function () {
                if (!memo) {
                    memo = supportsWebp_1(window);
                }
                return memo;
            };
        };
        webpIsSupported()().then(function (res) {
            handleLocalStorage_1.setLocalStorage('sWP', res ? 2 : 1);
        }).catch(function (err) {
            handleLocalStorage_1.setLocalStorage('sWP', 1);
            console.log(err);
        });
        return false;
    }
}
exports.isSupportWebP = isSupportWebP;
