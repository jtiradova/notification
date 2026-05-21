import {
    tokenDerivedGapPropDefs,
    tokenDerivedGapValues,
} from "@singlestore/fusion/tokens-v2/js/props/gap.props";
import type { GetPropDefTypes } from "./prop-def";

export const gapValues = [...tokenDerivedGapValues] as const;

export const gapPropDefs = {
    ...tokenDerivedGapPropDefs,
} satisfies typeof tokenDerivedGapPropDefs;

export type GapProps = GetPropDefTypes<typeof gapPropDefs>;
