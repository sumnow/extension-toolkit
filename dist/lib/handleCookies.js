"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCookie = exports.hasCookie = exports.setCookie = exports.getCookie = void 0;
function getCookie(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || undefined;
}
exports.getCookie = getCookie;
function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return undefined;
    }
    var sExpires = "";
    if (vEnd) {
        if (typeof vEnd === 'number') {
            var _e = vEnd * 24 * 3600;
            sExpires = "; max-age=" + (_e);
        }
        if (typeof vEnd === 'string') {
            sExpires = "; expires=" + vEnd;
        }
        if (vEnd.constructor === Date) {
            sExpires = "; expires=" + vEnd.toUTCString();
        }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return sValue;
}
exports.setCookie = setCookie;
function hasCookie(sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}
exports.hasCookie = hasCookie;
function deleteCookie(sKey, sPath, sDomain) {
    if (!sKey || !hasCookie(sKey)) {
        return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
}
exports.deleteCookie = deleteCookie;
