/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedHeightValues = ["xs", "sm", "md", "lg", "xl"] as const;

export const tokenDerivedHeightPropDefs = {
    height: {
        type: "enum | string",
        className: "sui-r-height",
        customProperties: ["--sui-height"],
        values: tokenDerivedHeightValues,
        responsive: true,
    },

    minHeight: {
        type: "enum | string",
        className: "sui-r-min-height",
        customProperties: ["--sui-min-height"],
        values: tokenDerivedHeightValues,
        responsive: true,
    },

    maxHeight: {
        type: "enum | string",
        className: "sui-r-max-height",
        customProperties: ["--sui-max-height"],
        values: tokenDerivedHeightValues,
        responsive: true,
    },
} satisfies {
    height: PropDef<(typeof tokenDerivedHeightValues)[number]>;
    minHeight: PropDef<(typeof tokenDerivedHeightValues)[number]>;
    maxHeight: PropDef<(typeof tokenDerivedHeightValues)[number]>;
};

export type TokenDerivedHeightProps = GetPropDefTypes<
    typeof tokenDerivedHeightPropDefs
>;
