import {
    tokenDerivedHeightPropDefs,
    tokenDerivedHeightValues,
} from "@singlestore/fusion/tokens-v2/js/props/height.props";
import type { GetPropDefTypes } from "./prop-def";

export const heightValues = [...tokenDerivedHeightValues] as const;

export const heightPropDefs = {
    ...tokenDerivedHeightPropDefs,
} satisfies typeof tokenDerivedHeightPropDefs;

export type HeightProps = GetPropDefTypes<typeof heightPropDefs>;
