/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedFontWeightValues = [
    "book",
    "regular",
    "medium",
    "bold",
] as const;

export const tokenDerivedFontWeightPropDefs = {
    weight: {
        type: "enum",
        className: "sui-r-weight",
        values: tokenDerivedFontWeightValues,
        responsive: true,
    },
} satisfies {
    weight: PropDef<(typeof tokenDerivedFontWeightValues)[number]>;
};

export type TokenDerivedFontWeightProps = GetPropDefTypes<
    typeof tokenDerivedFontWeightPropDefs
>;
