declare type ObjectKV = {
    [key: string]: any;
};
declare function getType(obj: any): string;
declare function generateSetFromBaseTypeArr<T>(arr: T[]): T[];
declare function generateSetFromObjectArr(arr: ObjectKV[], prop: string): ObjectKV[];
declare function generateSetFromArr(arr: [], prop?: string): any[];
declare const isTrue: (s: string | undefined) => boolean;
declare const isEmpty: (val: any) => Boolean;
declare const isEmptyObject: (val: object) => boolean;
declare const isEmptyArray: (val: []) => boolean;
declare const MoneyCapital: (n: string) => string;
declare const isAllPassInArray: (func: (e: any, i: number, array: Array<Object>) => Boolean, array: Array<Object>) => Boolean;
declare const isHasPassInArray: (func: (e: any, i: number, array: Array<Object>) => Boolean, array: Array<Object>) => Boolean;
declare const selectPropsInObj: (obj: ObjectKV, props: string[]) => ObjectKV;
declare const filterPropsInObj: (obj: ObjectKV, props: string[]) => ObjectKV;
declare function traverseObj(obj1: ObjectKV, func: (o: any, i: string, _obj: ObjectKV) => {}, notDeep?: boolean): void;
export { getType, generateSetFromBaseTypeArr, generateSetFromObjectArr, generateSetFromArr, isTrue, isEmpty, isEmptyObject, isEmptyArray, MoneyCapital, isAllPassInArray, isHasPassInArray, selectPropsInObj, filterPropsInObj, traverseObj, };
