declare function getCookie(sKey: string): string | undefined;
declare function setCookie(sKey: string, sValue: any, vEnd: Date | string | number, sPath?: string, sDomain?: string, bSecure?: string): string | undefined;
declare function hasCookie(sKey: string): boolean;
declare function deleteCookie(sKey: string, sPath?: string, sDomain?: string): boolean;
export { getCookie, setCookie, hasCookie, deleteCookie, };
