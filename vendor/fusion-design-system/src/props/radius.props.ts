import {
    tokenDerivedRadiusPropDefs,
    tokenDerivedRadiusValues,
} from "@singlestore/fusion/tokens-v2/js/props/radius.props";
import type { GetPropDefTypes } from "./prop-def";

export const radiusValues = [...tokenDerivedRadiusValues] as const;

export const radiusPropDefs = {
    ...tokenDerivedRadiusPropDefs,
} satisfies typeof tokenDerivedRadiusPropDefs;

export type RadiusProps = GetPropDefTypes<typeof radiusPropDefs>;
