import type { PropDef } from "@singlestore/fusion/props/prop-def";

const orientationValues = ["horizontal", "vertical"] as const;
const sizes = ["1", "2", "3", "4"] as const;
const colors = [
    "primary",
    "secondary",
    "brand",
    "positive",
    "warning",
    "critical",
    "info",
] as const;

const separatorPropDefs = {
    orientation: {
        type: "enum",
        className: "sui-r-orientation",
        values: orientationValues,
        default: "horizontal",
        responsive: true,
    },
    size: {
        type: "enum",
        className: "sui-r-size",
        values: sizes,
        default: "4",
        responsive: true,
    },
    color: {
        type: "enum",
        className: "sui-color",
        values: colors,
        default: "primary",
    },
    decorative: { type: "boolean", default: true },
} satisfies {
    orientation: PropDef<(typeof orientationValues)[number]>;
    size: PropDef<(typeof sizes)[number]>;
    color: PropDef<(typeof colors)[number]>;
    decorative: PropDef<boolean>;
};

export { separatorPropDefs };
