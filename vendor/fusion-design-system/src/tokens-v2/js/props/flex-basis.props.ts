/**
 * This file was generated
 * ⛔ Do not edit directly
 * See 'fusion-design-system/style-dictionary/build.ts' for more info
 */

import type {
    GetPropDefTypes,
    PropDef,
} from "@singlestore/fusion/props/prop-def";

export const tokenDerivedFlexBasisValues = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
] as const;

export const tokenDerivedFlexBasisPropDefs = {
    flexBasis: {
        type: "enum | string",
        className: "sui-r-flex-basis",
        customProperties: ["--sui-flex-basis"],
        values: tokenDerivedFlexBasisValues,
        responsive: true,
    },
} satisfies {
    flexBasis: PropDef<(typeof tokenDerivedFlexBasisValues)[number]>;
};

export type TokenDerivedFlexBasisProps = GetPropDefTypes<
    typeof tokenDerivedFlexBasisPropDefs
>;
