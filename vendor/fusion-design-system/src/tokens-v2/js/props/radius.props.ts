/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedRadiusValues = [
    "sm",
    "md",
    "lg",
    "xl",
    "round",
    "pill",
] as const;

export const tokenDerivedRadiusPropDefs = {
    radius: {
        type: "enum",
        className: "sui-r-radius",
        values: tokenDerivedRadiusValues,
        responsive: true,
    },
} satisfies {
    radius: PropDef<(typeof tokenDerivedRadiusValues)[number]>;
};

export type TokenDerivedRadiusProps = GetPropDefTypes<
    typeof tokenDerivedRadiusPropDefs
>;
