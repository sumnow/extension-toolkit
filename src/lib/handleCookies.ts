function getCookie(sKey: string): string | undefined {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || undefined;
}


function setCookie(sKey: string, sValue: any, vEnd: Date | string | number, sPath?: string, sDomain?: string, bSecure?: string): string | undefined {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return undefined; }
    var sExpires = "";
    if (vEnd) {
        if (typeof vEnd === 'number') {
            const _e = vEnd * 24 * 3600;
            sExpires = `; max-age=${(_e)}`
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

function hasCookie(sKey: string): boolean {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}

function deleteCookie(sKey: string, sPath?: string, sDomain?: string) {
    if (!sKey || !hasCookie(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
}


export {
    getCookie,
    setCookie,
    hasCookie,
    deleteCookie,
}
