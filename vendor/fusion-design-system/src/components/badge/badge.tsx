import type { VariantProps } from "cva";
import { cva } from "cva";
import React from "react";

import { Span } from "@singlestore/fusion/components/typography";
import "./badge.scss";

export const badgeVariants = {
    variant: {
        primary: "sui-c-badge--variant-primary",
        secondary: "sui-c-badge--variant-secondary",
        neutral: "sui-c-badge--variant-neutral",
        positive: "sui-c-badge--variant-positive",
        critical: "sui-c-badge--variant-critical",
        info: "sui-c-badge--variant-info",
        warning: "sui-c-badge--variant-warning",
    },
};

export const badge = cva({
    base: "sui-c-badge",
    variants: badgeVariants,
    defaultVariants: {
        variant: "neutral",
    },
});

export type BadgeProps = Omit<React.ComponentProps<typeof Span>, "variant"> &
    VariantProps<typeof badge>;

/**
 * Used to indicate status or category.
 */
export const Badge = React.forwardRef<
    React.ElementRef<"span">,
    React.PropsWithChildren<BadgeProps>
>((props, forwardedRef) => {
    const { variant, children, className, ...rest } = props;

    const classes = badge({ variant, class: className });

    return (
        <Span ref={forwardedRef} className={classes} {...rest}>
            {children}
        </Span>
    );
});
