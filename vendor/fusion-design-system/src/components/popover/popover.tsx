import * as PopoverPrimitive from "./primitive";
import { cx } from "cva";
import React from "react";
import "./popover.scss";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { faX } from "@fortawesome/sharp-solid-svg-icons";

/**
 * A popover is a non-modal dialog that floats around the page.
 * It displays rich content in a portal, triggered by a button.
 *
 * This, the root, contains all the parts of a popover.
 */
export const Popover = PopoverPrimitive.Root;

/**
 * When used, portals the content part into the body.
 */
export const PopoverPortal = PopoverPrimitive.Portal;

export const PopoverTrigger = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Trigger>,
    React.ComponentProps<typeof PopoverPrimitive.Trigger>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <PopoverPrimitive.Trigger
            {...rest}
            ref={forwardedRef}
            className={cx("sui-c-popover__trigger", className)}
        />
    );
});

export const PopoverAnchor = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Anchor>,
    React.ComponentProps<typeof PopoverPrimitive.Anchor>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <PopoverPrimitive.Anchor
            {...rest}
            ref={forwardedRef}
            className={cx("sui-c-popover__anchor", className)}
        />
    );
});

export const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentProps<typeof PopoverPrimitive.Content>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <PopoverPortal>
            <PopoverPrimitive.Content
                ref={forwardedRef}
                collisionPadding={8} // At least 8px from edge of screen
                sideOffset={6} // 6px away from the trigger
                className={cx("sui-c-popover__content", className)}
                {...rest}
            />
        </PopoverPortal>
    );
});

export const PopoverClose = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Close>,
    React.ComponentProps<typeof PopoverPrimitive.Close>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <PopoverPrimitive.Close
            {...rest}
            ref={forwardedRef}
            className={cx("sui-c-popover__close", className)}
        >
            <FaIcon icon={faX} />
        </PopoverPrimitive.Close>
    );
});
