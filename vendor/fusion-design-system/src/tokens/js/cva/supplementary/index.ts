import { sizeUtilityVariants } from "../size";
import { spaceUtilityVariants } from "../space";
import * as deprecated from "./deprecated";
import { backgroundColorUtilityVariants } from "@singlestore/fusion/tokens/js/cva/background-color";
import { textColorUtilityVariants } from "@singlestore/fusion/tokens/js/cva/text-color";

export const displayUtilityVariants = () => ({
    block: "sui-u-block",
    "inline-block": "sui-u-inline-block",
    inline: "sui-u-inline",
    flex: "sui-u-flex",
    "inline-flex": "sui-u-inline-flex",
});

export const allMarginUtilityVariants = () => ({
    m: spaceUtilityVariants("m"),
    mx: spaceUtilityVariants("mx"),
    my: spaceUtilityVariants("my"),
    mt: spaceUtilityVariants("mt"),
    mr: spaceUtilityVariants("mr"),
    mb: spaceUtilityVariants("mb"),
    ml: spaceUtilityVariants("ml"),
});

export const allPaddingUtilityVariants = () => ({
    p: spaceUtilityVariants("p"),
    px: spaceUtilityVariants("px"),
    py: spaceUtilityVariants("py"),
    pt: spaceUtilityVariants("pt"),
    pr: spaceUtilityVariants("pr"),
    pb: spaceUtilityVariants("pb"),
    pl: spaceUtilityVariants("pl"),
});

export const allSpaceUtilityVariants = () => ({
    ...allMarginUtilityVariants(),
    ...allPaddingUtilityVariants(),
    gap: spaceUtilityVariants("gap"),
});

export const allSizeUtilityVariants = () => ({
    width: sizeUtilityVariants("width"),
    minWidth: sizeUtilityVariants("min-width"),
    maxWidth: sizeUtilityVariants("max-width"),

    height: sizeUtilityVariants("height"),
    minHeight: sizeUtilityVariants("min-height"),
    maxHeight: sizeUtilityVariants("max-height"),
    flexBasis: sizeUtilityVariants("flex-basis"),
});

export const allBackgroundUtilityVariants = () => ({
    background: {
        ...backgroundColorUtilityVariants(),
        ...deprecated.backgroundColorUtilityVariants(),
    },
});

export const allTextColorUtilityVariants = () => ({
    color: {
        white: "sui-u-color-white",
        currentColor: "sui-u-color-currentColor",

        ...textColorUtilityVariants(),
        ...deprecated.textColorUtilityVariants(),
    },
});
