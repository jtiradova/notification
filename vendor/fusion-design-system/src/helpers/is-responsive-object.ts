import type { Responsive, Breakpoint } from "@singlestore/fusion/props";
import { breakpoints } from "@singlestore/fusion/props";

export function isResponsiveObject<Value extends string>(
    obj: Maybe<Responsive<Value | Omit<string, Value>>>
): obj is Record<Breakpoint, string> {
    return (
        typeof obj === "object" &&
        Object.keys(obj).some((key) =>
            (breakpoints as ReadonlyArray<string>).includes(key)
        )
    );
}
