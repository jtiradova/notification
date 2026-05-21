/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedInsetValues = ["xs", "sm", "md", "lg", "xl"] as const;

export const tokenDerivedInsetPropDefs = {
    inset: {
        type: "enum | string",
        className: "sui-r-inset",
        customProperties: ["--sui-inset"],
        values: tokenDerivedInsetValues,
        responsive: true,
    },

    top: {
        type: "enum | string",
        className: "sui-r-top",
        customProperties: ["--sui-top"],
        values: tokenDerivedInsetValues,
        responsive: true,
    },

    right: {
        type: "enum | string",
        className: "sui-r-right",
        customProperties: ["--sui-right"],
        values: tokenDerivedInsetValues,
        responsive: true,
    },

    bottom: {
        type: "enum | string",
        className: "sui-r-bottom",
        customProperties: ["--sui-bottom"],
        values: tokenDerivedInsetValues,
        responsive: true,
    },

    left: {
        type: "enum | string",
        className: "sui-r-left",
        customProperties: ["--sui-left"],
        values: tokenDerivedInsetValues,
        responsive: true,
    },
} satisfies {
    inset: PropDef<(typeof tokenDerivedInsetValues)[number]>;
    top: PropDef<(typeof tokenDerivedInsetValues)[number]>;
    right: PropDef<(typeof tokenDerivedInsetValues)[number]>;
    bottom: PropDef<(typeof tokenDerivedInsetValues)[number]>;
    left: PropDef<(typeof tokenDerivedInsetValues)[number]>;
};

export type TokenDerivedInsetProps = GetPropDefTypes<
    typeof tokenDerivedInsetPropDefs
>;
