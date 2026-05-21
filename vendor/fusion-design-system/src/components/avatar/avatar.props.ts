import type { PropDef } from "@singlestore/fusion/props";
import { asChildPropDef } from "@singlestore/fusion/props";

const sizes = ["1", "2", "3", "4"] as const;
const variants = ["soft"] as const;
const radius = ["circle", "rounded"] as const;
const colors = ["brand", "neutral"] as const;

const avatarPropDefs = {
    ...asChildPropDef,
    size: {
        type: "enum",
        className: "sui-r-size",
        values: sizes,
        default: "1",
        responsive: true,
    },
    variant: {
        type: "enum",
        className: "sui-variant",
        values: variants,
        default: "soft",
    },
    color: {
        type: "enum",
        className: "sui-color",
        values: colors,
        default: "brand",
    },
    radius: {
        type: "enum",
        className: "sui-radius",
        values: radius,
        default: "rounded",
    },
    fallback: { type: "ReactNode", required: true },
} satisfies {
    size: PropDef<(typeof sizes)[number]>;
    variant: PropDef<(typeof variants)[number]>;
    fallback: PropDef<React.ReactNode>;
    color: PropDef<(typeof colors)[number]>;
    radius: PropDef<(typeof radius)[number]>;
};

export { avatarPropDefs };
