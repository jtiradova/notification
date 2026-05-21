import {
    tokenDerivedMarginPropDefs,
    tokenDerivedMarginValues,
} from "@singlestore/fusion/tokens-v2/js/props/margin.props";
import type { GetPropDefTypes } from "./prop-def";

export const marginValues = [...tokenDerivedMarginValues] as const;

export const marginPropDefs = {
    ...tokenDerivedMarginPropDefs,
} satisfies typeof tokenDerivedMarginPropDefs;

export type MarginProps = GetPropDefTypes<typeof marginPropDefs>;
