/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedGapValues = ["xs", "sm", "md", "lg", "xl"] as const;

export const tokenDerivedGapPropDefs = {
    gap: {
        type: "enum | string",
        className: "sui-r-gap",
        customProperties: ["--sui-gap"],
        values: tokenDerivedGapValues,
        responsive: true,
    },

    gapX: {
        type: "enum | string",
        className: "sui-r-gap-x",
        customProperties: ["--sui-column-gap"],
        values: tokenDerivedGapValues,
        responsive: true,
    },

    gapY: {
        type: "enum | string",
        className: "sui-r-gap-y",
        customProperties: ["--sui-row-gap"],
        values: tokenDerivedGapValues,
        responsive: true,
    },
} satisfies {
    gap: PropDef<(typeof tokenDerivedGapValues)[number]>;
    gapX: PropDef<(typeof tokenDerivedGapValues)[number]>;
    gapY: PropDef<(typeof tokenDerivedGapValues)[number]>;
};

export type TokenDerivedGapProps = GetPropDefTypes<
    typeof tokenDerivedGapPropDefs
>;
