import * as RadixSwitch from "@radix-ui/react-switch";
import type { VariantProps } from "cva";
import { cva, cx } from "cva";
import * as React from "react";

import "./toggle.scss";

export const toggle = cva({
    base: "sui-c-toggle",
    variants: {
        size: {
            medium: "sui-c-toggle--size-medium",
            small: "sui-c-toggle--size-small",
        },
        loading: {
            true: "sui-c-toggle--loading",
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

export function ToggleRoot({
    children,
    className,
    loading,
    disabled,
    size,
    ...rest
}: React.ComponentProps<typeof RadixSwitch.Root> &
    VariantProps<typeof toggle>) {
    return (
        <RadixSwitch.Root
            className={toggle({ size, loading, class: className })}
            disabled={disabled || Boolean(loading)}
            {...rest}
        >
            <span className="sui-c-toggle__frame">{children}</span>
        </RadixSwitch.Root>
    );
}

export function ToggleThumb({
    className,
    children,
    ...rest
}: RadixSwitch.SwitchThumbProps) {
    return (
        <RadixSwitch.Thumb
            className={cx("sui-c-toggle__thumb", className)}
            {...rest}
        >
            {children}
        </RadixSwitch.Thumb>
    );
}
