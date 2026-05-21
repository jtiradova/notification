/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedPaddingValues = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
] as const;

export const tokenDerivedPaddingPropDefs = {
    p: {
        type: "enum | string",
        className: "sui-r-p",
        customProperties: ["--sui-p"],
        values: tokenDerivedPaddingValues,
        responsive: true,
    },

    px: {
        type: "enum | string",
        className: "sui-r-px",
        customProperties: ["--sui-pl", "--sui-pr"],
        values: tokenDerivedPaddingValues,
        responsive: true,
    },

    py: {
        type: "enum | string",
        className: "sui-r-py",
        customProperties: ["--sui-pt", "--sui-pb"],
        values: tokenDerivedPaddingValues,
        responsive: true,
    },

    pt: {
        type: "enum | string",
        className: "sui-r-pt",
        customProperties: ["--sui-pt"],
        values: tokenDerivedPaddingValues,
        responsive: true,
    },

    pr: {
        type: "enum | string",
        className: "sui-r-pr",
        customProperties: ["--sui-pr"],
        values: tokenDerivedPaddingValues,
        responsive: true,
    },

    pb: {
        type: "enum | string",
        className: "sui-r-pb",
        customProperties: ["--sui-pb"],
        values: tokenDerivedPaddingValues,
        responsive: true,
    },

    pl: {
        type: "enum | string",
        className: "sui-r-pl",
        customProperties: ["--sui-pl"],
        values: tokenDerivedPaddingValues,
        responsive: true,
    },
} satisfies {
    p: PropDef<(typeof tokenDerivedPaddingValues)[number]>;
    px: PropDef<(typeof tokenDerivedPaddingValues)[number]>;
    py: PropDef<(typeof tokenDerivedPaddingValues)[number]>;
    pt: PropDef<(typeof tokenDerivedPaddingValues)[number]>;
    pr: PropDef<(typeof tokenDerivedPaddingValues)[number]>;
    pb: PropDef<(typeof tokenDerivedPaddingValues)[number]>;
    pl: PropDef<(typeof tokenDerivedPaddingValues)[number]>;
};

export type TokenDerivedPaddingProps = GetPropDefTypes<
    typeof tokenDerivedPaddingPropDefs
>;
