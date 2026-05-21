import type { Dict } from "./types";

/**
 * Returns a new object with the specified keys omitted.
 * @param object The object to omit keys from.
 * @param keys The keys to omit.
 * @returns A new object with the specified keys omitted.
 * @example
 * const object = { a: 1, b: 2, c: 3 };
 * const result = omit(object, ["a", "c"]);
 * console.log(result); // { b: 2 }
 */
export function omit<T extends Dict, K extends keyof T>(
    object: T,
    keys: Array<K>
) {
    const result: Dict = {};

    Object.keys(object).forEach((key) => {
        if (keys.includes(key as K)) return;
        result[key] = object[key];
    });

    return result as Omit<T, K>;
}

/**
 * Returns a new object with the specified keys picked.
 * @param object The object to pick keys from.
 * @param keys The keys to pick.
 * @returns A new object with the specified keys picked.
 * @example
 * const object = { a: 1, b: 2, c: 3 };
 * const result = pick(object, ["a", "c"]);
 * console.log(result); // { a: 1, c: 3 }
 */
export function pick<T extends Dict, K extends keyof T>(
    object: T,
    keys: Array<K>
) {
    const result = {} as Pick<T, K>;

    keys.forEach((key) => {
        if (key in object) {
            result[key] = object[key];
        }
    });

    return result;
}

/**
 * Returns a tuple of two objects, the first with the specified keys picked,
 * and the second with the leftovers.
 * @param object The object to split.
 * @param keys The keys to pick.
 * @returns A tuple of two objects, the first with the specified keys picked,
 * and the second with the leftovers.
 * @example
 * const object = { a: 1, b: 2, c: 3 };
 * const [picked, omitted] = split(object, ["a", "c"]);
 * console.log(picked); // { a: 1, c: 3 }
 * console.log(omitted); // { b: 2 }
 */
export function split<T extends Dict, K extends keyof T>(
    object: T,
    keys: Array<K>
) {
    const picked: Dict = {};
    const omitted: Dict = {};

    Object.keys(object).forEach((key) => {
        if (keys.includes(key as T[K])) {
            picked[key] = object[key];
        } else {
            omitted[key] = object[key];
        }
    });

    return [picked, omitted] as [Pick<T, K>, Omit<T, K>];
}

/**
 * Get value from a deeply nested object using a string path.
 * Memorizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param fallback  - the fallback value
 */
export function get(
    obj: Record<string, any>,
    path: string | number,
    fallback?: any,
    index?: number
) {
    const key = typeof path === "string" ? path.split(".") : [path];

    for (index = 0; index < key.length; index += 1) {
        if (!obj) break;
        obj = obj[key[index]];
    }

    return obj === undefined ? fallback : obj;
}

export type Maybe<T> = NonNullable<T> | undefined;

export type Nullable<T> = T | null;
