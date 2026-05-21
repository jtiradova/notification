import * as RadixSlot from "@radix-ui/react-slot";
import { boxVariants } from "@singlestore/fusion/components/layout/box";
import { split } from "@singlestore/fusion/utils/object";
import type { PolymorphicAsChildProp } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cva, cx } from "cva";
import React from "react";

import "./text.scss";

// https://discord.com/channels/752614004387610674/910871187826044978/928263845330427906

export const textVariants = {
    ...boxVariants,
    variant: {
        "annotation-1": "sui-c-text--variant-annotation-1",
        "annotation-2": "sui-c-text--variant-annotation-2",
        "code-1": "sui-c-text--variant-code-1",
        "code-2": "sui-c-text--variant-code-2",
        "tag-1": "sui-c-text--variant-tag-1",
        "label-1": "sui-c-text--variant-label-1",
        "label-2": "sui-c-text--variant-label-2",
        "body-1": "sui-c-text--variant-body-1",
        "body-2": "sui-c-text--variant-body-2",
        "body-3": "sui-c-text--variant-body-3",
        "body-4": "sui-c-text--variant-body-4",
        "heading-1": "sui-c-text--variant-heading-1",
        "heading-2": "sui-c-text--variant-heading-2",
        "heading-3": "sui-c-text--variant-heading-3",
        "heading-4": "sui-c-text--variant-heading-4",
        "heading-5": "sui-c-text--variant-heading-5",
        "heading-6": "sui-c-text--variant-heading-6",
        "heading-7": "sui-c-text--variant-heading-7",
        "heading-8": "sui-c-text--variant-heading-8",
    },
} as const;

export const textVariantPropsKeys = Object.keys(textVariants) as Array<
    keyof typeof textVariants
>;

export const text = cva({ base: "sui-c-text", variants: textVariants });

export const Label = React.forwardRef<
    React.ElementRef<"label">,
    React.ComponentPropsWithoutRef<"label"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "label";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-label",
                className,
                text({
                    variant: "label-2",
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});

export const Legend = React.forwardRef<
    React.ElementRef<"legend">,
    React.ComponentPropsWithoutRef<"legend"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "legend";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-legend",
                className,
                text({
                    variant: "label-2",
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});

export const Caption = React.forwardRef<
    React.ElementRef<"caption">,
    React.ComponentPropsWithoutRef<"caption"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "caption";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-caption",
                className,
                text({
                    variant: "label-2",
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});

export const FigureCaption = React.forwardRef<
    React.ElementRef<"figcaption">,
    React.ComponentPropsWithoutRef<"figcaption"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "figcaption";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-figure-caption",
                className,
                text({
                    variant: "label-2",
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});

export const Span = React.forwardRef<
    React.ElementRef<"span">,
    React.ComponentPropsWithoutRef<"span"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "span";

    return (
        <Comp
            ref={forwardedRef}
            className={cx("sui-c-span", className, text({ ...variantProps }))}
            {...elementProps}
        />
    );
});

export const Strong = React.forwardRef<
    React.ElementRef<"strong">,
    React.ComponentPropsWithoutRef<"strong"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "strong";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-strong",
                className,
                text({
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});

export const Em = React.forwardRef<
    React.ElementRef<"em">,
    React.ComponentPropsWithoutRef<"em"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "em";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-emphasis",
                className,
                text({
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});

export const Bold = React.forwardRef<
    React.ElementRef<"b">,
    React.ComponentPropsWithoutRef<"b"> &
        VariantProps<typeof text> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "b";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-bold",
                className,
                text({
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});
