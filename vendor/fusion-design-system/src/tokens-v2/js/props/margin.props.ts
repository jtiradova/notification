/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedMarginValues = ["xs", "sm", "md", "lg", "xl"] as const;

export const tokenDerivedMarginPropDefs = {
    m: {
        type: "enum | string",
        className: "sui-r-m",
        customProperties: ["--sui-m"],
        values: tokenDerivedMarginValues,
        responsive: true,
    },

    mx: {
        type: "enum | string",
        className: "sui-r-mx",
        customProperties: ["--sui-ml", "--sui-mr"],
        values: tokenDerivedMarginValues,
        responsive: true,
    },

    my: {
        type: "enum | string",
        className: "sui-r-my",
        customProperties: ["--sui-mt", "--sui-mb"],
        values: tokenDerivedMarginValues,
        responsive: true,
    },

    mt: {
        type: "enum | string",
        className: "sui-r-mt",
        customProperties: ["--sui-mt"],
        values: tokenDerivedMarginValues,
        responsive: true,
    },

    mr: {
        type: "enum | string",
        className: "sui-r-mr",
        customProperties: ["--sui-mr"],
        values: tokenDerivedMarginValues,
        responsive: true,
    },

    mb: {
        type: "enum | string",
        className: "sui-r-mb",
        customProperties: ["--sui-mb"],
        values: tokenDerivedMarginValues,
        responsive: true,
    },

    ml: {
        type: "enum | string",
        className: "sui-r-ml",
        customProperties: ["--sui-ml"],
        values: tokenDerivedMarginValues,
        responsive: true,
    },
} satisfies {
    m: PropDef<(typeof tokenDerivedMarginValues)[number]>;
    mx: PropDef<(typeof tokenDerivedMarginValues)[number]>;
    my: PropDef<(typeof tokenDerivedMarginValues)[number]>;
    mt: PropDef<(typeof tokenDerivedMarginValues)[number]>;
    mr: PropDef<(typeof tokenDerivedMarginValues)[number]>;
    mb: PropDef<(typeof tokenDerivedMarginValues)[number]>;
    ml: PropDef<(typeof tokenDerivedMarginValues)[number]>;
};

export type TokenDerivedMarginProps = GetPropDefTypes<
    typeof tokenDerivedMarginPropDefs
>;
