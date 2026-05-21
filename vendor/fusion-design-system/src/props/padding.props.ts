import {
    tokenDerivedPaddingPropDefs,
    tokenDerivedPaddingValues,
} from "@singlestore/fusion/tokens-v2/js/props/padding.props";
import type { GetPropDefTypes } from "./prop-def";

export const paddingValues = [...tokenDerivedPaddingValues] as const;

export const paddingPropDefs = {
    ...tokenDerivedPaddingPropDefs,
} satisfies typeof tokenDerivedPaddingPropDefs;

export type PaddingProps = GetPropDefTypes<typeof paddingPropDefs>;
