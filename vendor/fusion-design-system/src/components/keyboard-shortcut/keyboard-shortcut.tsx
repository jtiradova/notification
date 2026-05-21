import React from "react";
import type { VariantProps } from "cva";
import { cva } from "cva";
import "./keyboard-shortcut.scss";
import { box, boxVariantPropsKeys } from "../layout";
import { split } from "@singlestore/fusion/utils/object";

export const getCtrlOrCmdKey = () => {
    const IS_MAC = navigator.platform.toLowerCase().includes("mac");

    if (IS_MAC) {
        return "⌘";
    }

    return "Ctrl";
};

export const keyboardShortcutVariants = {
    variant: {
        solid: "sui-c-keyboard-shortcut--variant-solid",
        ghost: "sui-c-keyboard-shortcut--variant-ghost",
        "ghost-on-dark": "sui-c-keyboard-shortcut--variant-ghost-on-dark",
    },
    inline: {
        true: "sui-c-keyboard-shortcut--inline",
        false: null,
    },
};

export const keyboardShortcut = cva({
    base: "sui-c-keyboard-shortcut",
    variants: keyboardShortcutVariants,
    defaultVariants: {
        variant: "solid",
        inline: false,
    },
});

export const KeyboardShortcut = React.forwardRef<
    React.ElementRef<"kbd">,
    React.ComponentPropsWithoutRef<"kbd"> &
        VariantProps<typeof box> &
        VariantProps<typeof keyboardShortcut>
>((props, forwardedRef) => {
    const { variant, inline, children, className, ...rest } = props;
    const [variantProps, elementProps] = split(rest, boxVariantPropsKeys);

    const classes = box({
        ...variantProps,
        class: keyboardShortcut({ variant, inline, class: className }),
    });

    return (
        <kbd ref={forwardedRef} className={classes} {...elementProps}>
            {children}
        </kbd>
    );
});
