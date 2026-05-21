/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedWidthValues = ["xs", "sm", "md", "lg", "xl"] as const;

export const tokenDerivedWidthPropDefs = {
    width: {
        type: "enum | string",
        className: "sui-r-width",
        customProperties: ["--sui-width"],
        values: tokenDerivedWidthValues,
        responsive: true,
    },

    minWidth: {
        type: "enum | string",
        className: "sui-r-min-width",
        customProperties: ["--sui-min-width"],
        values: tokenDerivedWidthValues,
        responsive: true,
    },

    maxHeight: {
        type: "enum | string",
        className: "sui-r-max-height",
        customProperties: ["--sui-max-height"],
        values: tokenDerivedWidthValues,
        responsive: true,
    },
} satisfies {
    width: PropDef<(typeof tokenDerivedWidthValues)[number]>;
    minWidth: PropDef<(typeof tokenDerivedWidthValues)[number]>;
    maxHeight: PropDef<(typeof tokenDerivedWidthValues)[number]>;
};

export type TokenDerivedWidthProps = GetPropDefTypes<
    typeof tokenDerivedWidthPropDefs
>;
