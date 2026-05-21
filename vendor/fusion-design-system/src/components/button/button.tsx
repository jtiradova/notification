import * as RadixSlot from "@radix-ui/react-slot";
import { boxVariants } from "@singlestore/fusion/components/layout/box";
import { split } from "@singlestore/fusion/utils/object";
import type { PolymorphicAsChildProp } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cva } from "cva";
import * as React from "react";

import { useButtonGroup } from "@singlestore/fusion/components/button/button-group";
import type { IconDefinitionOrNode } from "@singlestore/fusion/components/icon";
import { FaIconDefinitionOrNode } from "@singlestore/fusion/components/icon";
import { Spinner } from "@singlestore/fusion/components/spinner/spinner";
import { dataAttr } from "@singlestore/fusion/utils/dom";
import "./button.scss";

export const buttonVariants = {
    ...boxVariants,
    /**
     * The style variant of the button.
     */
    variant: {
        "solid-brand": "sui-c-button--variant-solid-brand",
        "solid-neutral": "sui-c-button--variant-solid-neutral",
        "outline-brand": "sui-c-button--variant-outline-brand",
        "outline-neutral": "sui-c-button--variant-outline-neutral",
        "outline-danger": "sui-c-button--variant-outline-danger",
        "ghost-brand": "sui-c-button--variant-ghost-brand",
        "ghost-neutral": "sui-c-button--variant-ghost-neutral",
        unstyled: null,
    },
    /**
     * Whether the button is disabled
     */
    disabled: {
        true: "sui-c-button--disabled",
    },
    /**
     * The size of the button
     */
    size: {
        small: "sui-c-button--size-small",
        medium: "sui-c-button--size-medium",
        large: "sui-c-button--size-large",
    },
    /**
     * Whether the button should be square. Is always true for the IconButton
     */
    square: {
        true: "sui-c-button--square",
    },
    /**
     * Whether the button is in a loading state.
     * If true, the button will be disabled and a spinner will show
     * on the left side of the button (hiding the leftIcon if set)
     */
    loading: {
        true: "sui-c-button--loading",
    },
    /**
     * Whether the button is highlighted
     * (e.g. when used as a dropdown menu trigger and the menu is open)
     * If true, the button will have a highlighted style.
     */
    highlighted: {
        true: "sui-c-button--highlighted",
    },
};

export const buttonVariantPropsKeys = Object.keys(buttonVariants) as Array<
    keyof typeof buttonVariants
>;

export const button = cva({
    base: "sui-c-button",
    variants: buttonVariants,
    defaultVariants: {
        variant: "outline-neutral",
        size: "medium",
    },
});

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
    VariantProps<typeof button> & {
        /**
         * The icon to display on the left side of the button
         */
        leftIcon?: IconDefinitionOrNode;
        /**
         * The icon to display on the right side of the button
         */
        rightIcon?: IconDefinitionOrNode;
    } & PolymorphicAsChildProp;

/**
 * The `Button` component is used to trigger an action or event, such as submitting a form, opening a DropdownMenu, or performing a delete operation.
 * It can contain text, an icon, or both.
 *
 * @see Storybook (developer documentation) {@link https://fusion.internal-virginia-1.memcompute.com/?path=/story/components-forms-inputs-button-button--basic-usage}
 * @see Confluence (design specifications) {@link https://memsql.atlassian.net/wiki/spaces/FDS/pages/2825355277/Button}
 * @see WAI-ARIA (accessibility insights) {@link https://www.w3.org/WAI/ARIA/apg/patterns/button/}
 * @see IconButton Use when the button only contains an icon (no text)
 * @see ButtonGroup {@link ./button-group.tsx} Use to provide consistent spacing between and/or a common variant to all buttons in a group
 */
export const Button = React.forwardRef<React.ElementRef<"button">, ButtonProps>(
    ({ className, ...restProps }, forwardedRef) => {
        const group = useButtonGroup();

        const [buttonVariantProps, rest] = split(
            restProps,
            buttonVariantPropsKeys
        );
        // default type for buttons is "submit", make sure we set it explicitly
        // to "button" here by default (if asChild not set) so we don't break a
        // bunch of forms https://stackoverflow.com/a/3315016/16977085
        const {
            asChild,
            type: buttonType = asChild ? undefined : "button",
            leftIcon,
            rightIcon,
            children,
            ...buttonProps
        } = rest;

        const Comp = asChild ? RadixSlot.Slot : "button";

        const disabled = group?.disabled || buttonVariantProps.disabled;
        const loading = buttonVariantProps.loading;
        const variant = group?.variant || buttonVariantProps.variant;
        const size = group?.size || buttonVariantProps.size;

        let icon = <FaIconDefinitionOrNode icon={leftIcon} />;
        if (loading) {
            icon = <Spinner />;
        }

        return (
            <Comp
                ref={forwardedRef}
                type={buttonType}
                className={button({
                    ...buttonVariantProps,
                    loading,
                    variant,
                    disabled,
                    size,
                    class: className,
                })}
                disabled={disabled || loading}
                data-disabled={dataAttr(disabled || loading)}
                {...buttonProps}
            >
                {icon}
                <RadixSlot.Slottable>{children}</RadixSlot.Slottable>
                <FaIconDefinitionOrNode icon={rightIcon} />
            </Comp>
        );
    }
);

type IconButtonBaseProps = Omit<
    ButtonProps,
    "square" | "leftIcon" | "rightIcon" | "children"
> & {
    "aria-label": string;
};

export type IconButtonPropsWithIconProp = IconButtonBaseProps & {
    icon: IconDefinitionOrNode;
    children?: never;
};

export type IconButtonPropsWithIconPropAndAsChild = IconButtonBaseProps & {
    icon?: IconDefinitionOrNode;
    asChild: true;
    children: React.ReactNode;
};

export type IconButtonPropsWithChildren = IconButtonBaseProps & {
    children: React.ReactNode;
    icon?: never;
};

export type IconButtonProps =
    | IconButtonPropsWithIconProp
    | IconButtonPropsWithChildren
    | IconButtonPropsWithIconPropAndAsChild;

/**
 * Used to trigger an action or event, such as submitting a form, opening a DropdownMenu, or performing a delete operation.
 * It contains just an icon, without text, and so requires `aria-label` and is always square.
 *
 * @see Storybook (developer documentation) https://fusion.internal-virginia-1.memcompute.com//?path=/story/components-forms-inputs-button-button--icon-button-basic-usage}
 * @see Confluence (design specifications) *TO-DO*
 * @see WAI-ARIA (accessibility insights) {@link https://www.w3.org/WAI/ARIA/apg/patterns/button/}
 * @see Button Use when the button contains text
 * @see ButtonGroup {@link ./button-group.tsx} Use to provide consistent spacing between and/or a common variant to all buttons in a group
 */
export const IconButton = React.forwardRef<
    React.ElementRef<"button">,
    IconButtonProps
>((props, forwardedRef) => {
    let content: React.ReactNode;
    let elementProps: Omit<IconButtonBaseProps, "children">;

    if ("icon" in props) {
        const { icon, children, ...rest } = props as
            | IconButtonPropsWithIconProp
            | IconButtonPropsWithIconPropAndAsChild;

        // If polymorphic, we need to make the icon the "child's child", else
        // we just render the Button as an <svg>
        if (rest.asChild) {
            if (
                !React.isValidElement(children) ||
                !React.Children.only(children)
            ) {
                throw new Error(
                    "IconButton with asChild must have a single valid child to render as"
                );
            }

            content = React.cloneElement(children as React.ReactElement<any>, {
                children: <FaIconDefinitionOrNode icon={icon} />,
            });
        } else {
            content = <FaIconDefinitionOrNode icon={icon} />;
        }

        elementProps = rest;
    } else {
        const { children, ...rest } = props as IconButtonPropsWithChildren;
        content = children;
        elementProps = rest;
    }

    return (
        <Button ref={forwardedRef} {...elementProps} square>
            {props.loading ? null : content}
        </Button>
    );
});
