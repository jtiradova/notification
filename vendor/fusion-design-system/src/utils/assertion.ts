import type { Dict } from "@singlestore/fusion/utils/types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction<T extends Function = Function>(
    value: any
): value is T {
    return typeof value === "function";
}

export function isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
}

export function isSymbol(value: any): value is symbol {
    return typeof value === "symbol";
}

export function isNumber(value: any): value is number {
    return typeof value === "number";
}

export function isUndefined(value: any): value is undefined {
    return typeof value === "undefined";
}

export function isString(value: any): value is string {
    return typeof value === "string";
}

export function isStringish(
    value: any
): value is string | number | symbol | boolean {
    return (
        isString(value) ||
        isNumber(value) ||
        isBoolean(value) ||
        isSymbol(value)
    );
}

export function isArray<T>(value: any): value is Array<T> {
    return Array.isArray(value);
}

export function isEmptyArray<T>(value: any): value is Array<T> {
    return isArray(value) && value.length === 0;
}

export function isObject(value: any): value is Dict {
    const type = typeof value;
    return (
        value != null &&
        (type === "object" || type === "function") &&
        !isArray(value)
    );
}
