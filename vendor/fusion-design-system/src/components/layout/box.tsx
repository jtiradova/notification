import * as RadixSlot from "@radix-ui/react-slot";
import {
    allBackgroundUtilityVariants,
    allSizeUtilityVariants,
    allSpaceUtilityVariants,
    allTextColorUtilityVariants,
    displayUtilityVariants,
    fontFamilyUtilityVariants,
    fontSizeUtilityVariants,
    fontWeightUtilityVariants,
    lineHeightUtilityVariants,
} from "@singlestore/fusion/tokens/js/cva";
import { split } from "@singlestore/fusion/utils/object";
import type { PolymorphicAsChildProp } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cva } from "cva";
import React from "react";

export const boxVariants = {
    ...allSpaceUtilityVariants(),
    ...allSizeUtilityVariants(),
    ...allTextColorUtilityVariants(),
    ...allBackgroundUtilityVariants(),

    fontFamily: fontFamilyUtilityVariants(),
    fontWeight: fontWeightUtilityVariants(),
    fontSize: fontSizeUtilityVariants(),
    lineHeight: lineHeightUtilityVariants(),
    textTransform: {
        capitalize: "sui-u-text-transform-capitalize",
        uppercase: "sui-u-text-transform-uppercase",
        lowercase: "sui-u-text-transform-lowercase",
        unset: "sui-u-text-transform-unset",
    },
    whiteSpace: {
        preWrap: "sui-u-white-space-pre-wrap",
        nowrap: "sui-u-white-space-nowrap",
    },
    textStyle: {
        normal: "sui-u-text-style-normal",
        italic: "sui-u-text-style-italic",
    },
    centerAlign: {
        true: "sui-u-center-align",
    },
    ellipsis: {
        true: "sui-u-ellipsis",
    },
    overflowWrap: {
        anywhere: "sui-u-overflow-wrap-anywhere",
        "break-word": "sui-u-overflow-wrap-break-word",
    },

    display: displayUtilityVariants(),
    position: {
        relative: "sui-u-position-relative",
        sticky: "sui-u-position-sticky",
        absolute: "sui-u-position-absolute",
        fixed: "sui-u-position-fixed",
    },
    cursor: {
        unset: "sui-u-cursor-unset",
    },
    top: {
        "0": "sui-u-top-0",
    },
    right: {
        "0": "sui-u-right-0",
    },
    bottom: {
        "0": "sui-u-bottom-0",
    },
    left: {
        "0": "sui-u-left-0",
    },
    textAlign: {
        left: "sui-u-text-align-left",
        center: "sui-u-text-align-center",
        right: "sui-u-text-align-right",
    },
    overflow: {
        auto: "sui-u-overflow-auto",
        hidden: "sui-u-overflow-hidden",
        visible: "sui-u-overflow-visible",
    },
    overflowX: {
        auto: "sui-u-overflow-x-auto",
        hidden: "sui-u-overflow-x-hidden",
        visible: "sui-u-overflow-x-visible",
    },
    overflowY: {
        auto: "sui-u-overflow-y-auto",
        hidden: "sui-u-overflow-y-hidden",
        visible: "sui-u-overflow-y-visible",
    },

    flex: {
        auto: "sui-u-flex-auto",
        "1": "sui-u-flex-1",
    },
    flexGrow: {
        "0": "sui-u-flex-grow-0",
        "1": "sui-u-flex-grow-1",
        "2": "sui-u-flex-grow-2",
        "3": "sui-u-flex-grow-3",
        "4": "sui-u-flex-grow-4",
        "5": "sui-u-flex-grow-5",
        "999": "sui-u-flex-grow-999",
    },
    flexShrink: {
        "0": "sui-u-flex-shrink-0",
        "1": "sui-u-flex-shrink-1",
    },

    justifySelf: {
        auto: "sui-u-justify-self-auto",
        center: "sui-u-justify-self-center",
        start: "sui-u-justify-self-start",
        end: "sui-u-justify-self-end",
        stretch: "sui-u-justify-self-stretch",
    },
    alignSelf: {
        auto: "sui-u-align-self-auto",
        center: "sui-u-align-self-center",
        start: "sui-u-align-self-start",
        end: "sui-u-align-self-end",
        stretch: "sui-u-align-self-stretch",
        baseline: "sui-u-align-self-baseline",
    },

    flexDirection: {
        row: "sui-u-flex-row",
        column: "sui-u-flex-column",
        "row-reverse": "sui-u-flex-row-reverse",
        "column-reverse": "sui-u-flex-column-reverse",
    },
    alignItems: {
        center: "sui-u-align-items-center",
        start: "sui-u-align-items-start",
        end: "sui-u-align-items-end",
        stretch: "sui-u-align-items-stretch",
        baseline: "sui-u-align-items-baseline",
    },

    alignContent: {
        center: "sui-u-align-content-center",
        start: "sui-u-align-content-start",
        end: "sui-u-align-content-end",
        stretch: "sui-u-align-content-stretch",
        "space-between": "sui-u-align-content-space-between",
        "space-around": "sui-u-align-content-space-around",
    },
    justifyContent: {
        center: "sui-u-justify-content-center",
        start: "sui-u-justify-content-start",
        end: "sui-u-justify-content-end",
        "space-between": "sui-u-justify-content-space-between",
    },
    flexWrap: {
        nowrap: "sui-u-flex-nowrap",
        wrap: "sui-u-flex-wrap",
        "wrap-reverse": "sui-u-flex-wrap-reverse",
    },
    /**
    Will visually hide the element but keep it accessible to screen readers.
    Useful for labelling elements for accessibility and testing without adding a visual element to the screen. 
    */
    visuallyHidden: {
        true: "sui-u-visually-hidden",
    },
};

export const boxVariantPropsKeys = Object.keys(boxVariants) as Array<
    keyof typeof boxVariants
>;

/**
 * Class builder for applying utility classes to a Box component. This is used internally by the Box component,
 * but can be used to apply utility classes to any element via it's `className` prop.
 * @example
 *  <nav
 *    className={box({
 *      p: "2x",
 *      background: "surface-raised-1",
 *      class: "my-custom-element"
 *    })}
 *  >
 *   <p>Some content</p>
 *  </nav>
 *
 *  // will render
 *
 *  <nav class="sui-u-p-2x sui-u-background-surface-raised-1 my-custom-element">
 *    <p>Some content</p>
 *  </nav>
 */
export const box = cva({
    base: "",
    variants: boxVariants,
});

type BoxProps = React.ComponentPropsWithoutRef<"div"> &
    VariantProps<typeof box> &
    PolymorphicAsChildProp;

/**
 * Box is a primitive layout component that renders a `<div>` and accepts props that can be used to apply the
 * design system's available utility classes in an ergonomic and type-safe way.
 * @example
 * <Box p="2x" background="surface-raised-1">
 *   <p>Some content</p>
 * </Box>
 *
 * // will render
 *
 * <div class="sui-u-p-2x sui-u-background-surface-raised-1">
 *  <p>Some content</p>
 * </div>
 *
 * It accepts an `asChild` prop which, when `true`, will render as it's direct child
 * instead of a div. This is useful when you want to use Box utility props on an element other than a div.
 * @see
 * {@link https://www.radix-ui.com/docs/primitives/utilities/slot | Radix Slot}
 * @example
 * <Box asChild p="2x" background="surface-raised-1">
 *  <nav>Some content</nav>
 * </Box>
 *
 * // will render
 *
 * <nav class="sui-u-p-2x sui-u-background-surface-raised-1">
 *  Some content
 * </nav>
 
 */
export const Box = React.forwardRef<React.ElementRef<"div">, BoxProps>(
    ({ className, asChild, ...rest }, forwardedRef) => {
        const [boxVariantProps, divProps] = split(rest, boxVariantPropsKeys);
        const Comp = asChild ? RadixSlot.Slot : "div";

        return (
            <Comp
                ref={forwardedRef}
                className={box({
                    ...boxVariantProps,
                    class: className,
                })}
                {...divProps}
            />
        );
    }
);

Box.displayName = "Box";
