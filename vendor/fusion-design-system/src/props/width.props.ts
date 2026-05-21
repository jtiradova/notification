import {
    tokenDerivedWidthPropDefs,
    tokenDerivedWidthValues,
} from "@singlestore/fusion/tokens-v2/js/props/width.props";
import type { GetPropDefTypes } from "./prop-def";

export const widthValues = [...tokenDerivedWidthValues] as const;

export const widthPropDefs = {
    ...tokenDerivedWidthPropDefs,
} satisfies typeof tokenDerivedWidthPropDefs;

export type WidthProps = GetPropDefTypes<typeof widthPropDefs>;
