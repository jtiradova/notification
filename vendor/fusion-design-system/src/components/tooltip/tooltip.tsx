import * as TooltipPrimitive from "./primitive";

import React from "react";
import { cx } from "cva";

import { type Box } from "../layout";

import "./tooltip.scss";

/**
 * Provider for tooltips
 * This must be included somewhere in your application before using tooltips
 */
export const TooltipProvider = (
    props: React.ComponentProps<typeof TooltipPrimitive.Provider>
) => <TooltipPrimitive.Provider {...props} />;

type TooltipProps = Omit<TooltipRootProps, "children"> &
    Omit<TooltipContentProps, "children" | "content"> & {
        children: React.ReactNode;
        content: React.ReactNode;
        triggerWrapperClassName?: string;
        disabled?: boolean;
    };

/**
 * Main Tooltip component used to display informational content when hovering over an element.
 *
 * This component combines TooltipRoot, TooltipTrigger, and TooltipContent for easier usage.
 *
 * Note: You must wrap your application with TooltipProvider before using this component.
 */
export const Tooltip = React.forwardRef<
    React.ElementRef<typeof Box>,
    TooltipProps
>((props, forwardedRef) => {
    const {
        // Specific props
        children,
        content,
        disabled,
        // Root props
        defaultOpen,
        open,
        onOpenChange,
        delayDuration,
        disableHoverableContent,
        // Trigger props
        triggerWrapperClassName,
        // Content props
        ...contentProps
    } = props;

    if (disabled || !content) {
        return <>{children}</>;
    }

    const rootProps = {
        defaultOpen,
        open,
        onOpenChange,
        delayDuration,
        disableHoverableContent,
    };

    return (
        <TooltipRoot {...rootProps}>
            <TooltipTrigger className={triggerWrapperClassName}>
                {children}
            </TooltipTrigger>
            <TooltipContent ref={forwardedRef} {...contentProps}>
                {content}
            </TooltipContent>
        </TooltipRoot>
    );
});

type TooltipRootProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

/**
 * Root component that manages the tooltip state and positioning.
 */
export const TooltipRoot = (
    props: React.ComponentProps<typeof TooltipPrimitive.Root>
) => {
    return <TooltipPrimitive.Root {...props} />;
};

/**
 * The trigger element that the tooltip is attached to
 */
export const TooltipTrigger = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Trigger>,
    Omit<
        React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> & {
            className?: string;
        },
        "asChild"
    >
>((props, forwardRef) => {
    const { children, className, ...rest } = props;

    // We need to wrap the children in a span for two reasons:
    // * If there are multiple children, we need a single element to pass to
    //   asChild
    // * If we have a single child but with pointer-events: none (a disabled
    //   button, for example) we still need a wrapper that has pointer events
    //   enabled for the tooltip to appear
    const content = (
        <span className={cx("sui-c-tooltip__trigger-wrapper", className)}>
            {children}
        </span>
    );

    return (
        <TooltipPrimitive.Trigger asChild ref={forwardRef} {...rest}>
            {content}
        </TooltipPrimitive.Trigger>
    );
});

type TooltipContentProps = React.ComponentProps<
    typeof TooltipPrimitive.Content
> & {
    hideArrow?: boolean;
};

/**
 * The actual tooltip content that appears when triggered
 */
export const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    TooltipContentProps
>((props, forwardRef) => {
    const {
        children,
        className,
        sideOffset = 4,
        hideArrow,
        collisionPadding = 16,
        ...rest
    } = props;

    let arrow: React.ReactNode = (
        <TooltipPrimitive.Arrow className={cx("sui-c-tooltip__arrow")} />
    );

    if (hideArrow) {
        arrow = null;
    }

    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                ref={forwardRef}
                className={cx("sui-c-tooltip__content", className)}
                sideOffset={sideOffset}
                collisionPadding={collisionPadding}
                {...rest}
            >
                {children}
                {arrow}
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    );
});
