import { isFunction } from "@singlestore/fusion/utils/assertion";
import type { FunctionArguments } from "@singlestore/fusion/utils/types";

export function runIfFn<T, U>(
    valueOrFn: T | ((...fnArgs: Array<U>) => T),
    ...args: Array<U>
): T {
    return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

export function callAllHandlers<T extends (event: any) => void>(
    ...fns: Array<Maybe<T>>
) {
    return function func(event: FunctionArguments<T>[0]) {
        fns.some((fn) => {
            fn?.(event);
            return event?.defaultPrevented;
        });
    };
}
