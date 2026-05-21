import { paddingPropDefs } from "./padding.props";
import { heightPropDefs } from "./height.props";
import { widthPropDefs } from "./width.props";

import type { PropDef, GetPropDefTypes } from "./prop-def";
import { tokenDerivedFlexBasisPropDefs } from "../tokens-v2/js/props/flex-basis.props";
import { tokenDerivedInsetPropDefs } from "../tokens-v2/js/props/inset.props";

const overflowValues = ["visible", "hidden", "clip", "scroll", "auto"] as const;
const positionValues = [
    "static",
    "relative",
    "absolute",
    "fixed",
    "sticky",
] as const;
const flexShrinkValues = ["0", "1"] as const;
const flexGrowValues = ["0", "1"] as const;

const layoutPropDefs = {
    ...paddingPropDefs,
    ...widthPropDefs,
    ...heightPropDefs,
    /**
     * Sets the CSS **position** property.
     * Supports the corresponding CSS values and responsive objects.
     *
     * @example
     * position="absolute"
     * position={{ sm: 'absolute', lg: 'sticky' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/position
     */
    position: {
        type: "enum",
        className: "sui-r-position",
        values: positionValues,
        responsive: true,
    },
    ...tokenDerivedInsetPropDefs,
    /**
     * Sets the CSS **overflow** property.
     * Supports the corresponding CSS values and responsive objects.
     *
     * @example
     * overflow="hidden"
     * overflow={{ sm: 'hidden', lg: 'visible' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
     */
    overflow: {
        type: "enum",
        className: "sui-r-overflow",
        values: overflowValues,
        responsive: true,
    },
    /**
     * Sets the CSS **overflow-x** property.
     * Supports the corresponding CSS values and responsive objects.
     *
     * @example
     * overflowX="hidden"
     * overflowX={{ sm: 'hidden', md: 'visible' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
     */
    overflowX: {
        type: "enum",
        className: "sui-r-ox",
        values: overflowValues,
        responsive: true,
    },
    /**
     * Sets the CSS **overflow-y** property.
     * Supports the corresponding CSS values and responsive objects.
     *
     * @example
     * overflowY="hidden"
     * overflowY={{ sm: 'hidden', md: 'visible' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
     */
    overflowY: {
        type: "enum",
        className: "sui-r-oy",
        values: overflowValues,
        responsive: true,
    },
    /**
     * Sets the CSS **flex-basis** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * flexBasis="0"
     * flexBasis="100%"
     * flexBasis={{ sm: '200px', lg: 'auto' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
     */
    ...tokenDerivedFlexBasisPropDefs,
    /**
     * Sets the CSS **flex-shrink** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * flexShrink="0"
     * flexShrink="1"
     * flexShrink={{ sm: '0', lg: '1' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
     */
    flexShrink: {
        type: "enum | string",
        className: "sui-r-fs",
        customProperties: ["--flex-shrink"],
        values: flexShrinkValues,
        responsive: true,
    },
    /**
     * Sets the CSS **flex-grow** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * flexGrow="0"
     * flexGrow="1"
     * flexGrow={{ sm: '0', lg: '1' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
     */
    flexGrow: {
        type: "enum | string",
        className: "sui-r-fg",
        customProperties: ["--flex-grow"],
        values: flexGrowValues,
        responsive: true,
    },
    /**
     * Sets the CSS **grid-column** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * gridColumn="1"
     * gridColumn="1 / -1"
     * gridColumn={{ sm: '1 / 3', lg: 'span 3' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
     */
    gridColumn: {
        type: "string",
        className: "sui-r-gc",
        customProperties: ["--grid-column"],
        responsive: true,
    },
    /**
     * Sets the CSS **grid-column-start** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * gridColumnStart="1"
     * gridColumnStart="auto"
     * gridColumnStart={{ sm: '2', lg: 'span 3' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
     */
    gridColumnStart: {
        type: "string",
        className: "sui-r-gcs",
        customProperties: ["--grid-column-start"],
        responsive: true,
    },
    /**
     * Sets the CSS **grid-column-end** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * gridColumnEnd="1"
     * gridColumnEnd="auto"
     * gridColumnEnd={{ sm: '2', lg: 'span 3' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
     */
    gridColumnEnd: {
        type: "string",
        className: "sui-r-gce",
        customProperties: ["--grid-column-end"],
        responsive: true,
    },
    /**
     * Sets the CSS **grid-row** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * gridRow="1"
     * gridRow="auto"
     * gridRow={{ sm: '2', lg: 'span 3' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
     */
    gridRow: {
        type: "string",
        className: "sui-r-gr",
        customProperties: ["--grid-row"],
        responsive: true,
    },
    /**
     * Sets the CSS **grid-row-start** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * gridRowStart="1"
     * gridRowStart="auto"
     * gridRowStart={{ sm: '2', lg: 'span 3' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
     */
    gridRowStart: {
        type: "string",
        className: "sui-r-grs",
        customProperties: ["--grid-row-start"],
        responsive: true,
    },
    /**
     * Sets the CSS **grid-row-end** property.
     * Supports CSS strings and responsive objects.
     *
     * @example
     * gridRowEnd="1"
     * gridRowEnd="auto"
     * gridRowEnd={{ sm: '2', lg: 'span 3' }}
     *
     * @link
     * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
     */
    gridRowEnd: {
        type: "string",
        className: "sui-r-gre",
        customProperties: ["--grid-row-end"],
        responsive: true,
    },
} satisfies {
    position: PropDef<(typeof positionValues)[number]>;
    overflow: PropDef<(typeof overflowValues)[number]>;
    overflowX: PropDef<(typeof overflowValues)[number]>;
    overflowY: PropDef<(typeof overflowValues)[number]>;
    flexBasis: PropDef<string>;
    flexShrink: PropDef<(typeof flexShrinkValues)[number]>;
    flexGrow: PropDef<(typeof flexGrowValues)[number]>;
    gridColumn: PropDef<string>;
    gridColumnStart: PropDef<string>;
    gridColumnEnd: PropDef<string>;
    gridRow: PropDef<string>;
    gridRowStart: PropDef<string>;
    gridRowEnd: PropDef<string>;
} & typeof paddingPropDefs &
    typeof widthPropDefs &
    typeof heightPropDefs &
    typeof tokenDerivedInsetPropDefs;

// Use all of the imported prop defs to ensure that JSDoc works
type LayoutProps = GetPropDefTypes<
    typeof paddingPropDefs &
        typeof widthPropDefs &
        typeof heightPropDefs &
        typeof layoutPropDefs &
        typeof tokenDerivedInsetPropDefs
>;

export { layoutPropDefs };
export type { LayoutProps };
