import { isStringish } from "@singlestore/fusion/utils/assertion";
import React from "react";

export function isStringishChildren(
    children: React.ReactNode | Array<React.ReactNode>
): ReturnType<typeof isStringish> {
    return (
        isStringish(children) ||
        React.Children.toArray(children).every(isStringish)
    );
}
