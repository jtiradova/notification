import type { Booleanish } from "@singlestore/fusion/utils/types";

export function canUseDOM(): boolean {
    return !!(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
}

export const isBrowser = canUseDOM();

export const dataAttr = (condition: Maybe<boolean>) =>
    (condition ? "" : undefined) as Booleanish;
