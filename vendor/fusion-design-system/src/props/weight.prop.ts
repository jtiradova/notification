import {
    tokenDerivedFontWeightPropDefs,
    tokenDerivedFontWeightValues,
} from "@singlestore/fusion/tokens-v2/js/props/weight.props";
import type { GetPropDefTypes } from "./prop-def";

export const weightValues = [...tokenDerivedFontWeightValues] as const;

export const weightPropDefs = {
    ...tokenDerivedFontWeightPropDefs,
} satisfies typeof tokenDerivedFontWeightPropDefs;

export type WeightProps = GetPropDefTypes<typeof weightPropDefs>;
