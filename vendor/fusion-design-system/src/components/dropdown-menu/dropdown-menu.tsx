import * as DropdownMenuPrimitive from "./primitive";

import React from "react";

import { faCircleSmall as faCircleSmallLight } from "@fortawesome/sharp-light-svg-icons";
import {
    faCheck,
    faChevronRight,
    faCircleSmall,
    faMinus,
} from "@fortawesome/sharp-solid-svg-icons";
import type { IconDefinitionOrNode } from "@singlestore/fusion/components/icon";
import { FaIconDefinitionOrNode } from "@singlestore/fusion/components/icon";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { Paragraph, Span } from "@singlestore/fusion/components/typography";
import { createContext } from "@singlestore/fusion/react-utils/context";
import type {
    UseCheckboxGroupProps,
    UseCheckboxGroupReturn,
} from "@singlestore/fusion/react-utils/use-checkbox-group";
import { useCheckboxGroup } from "@singlestore/fusion/react-utils/use-checkbox-group";
import { isUndefined } from "@singlestore/fusion/utils/assertion";
import { callAllHandlers } from "@singlestore/fusion/utils/function";
import type { RequiredKeys } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cva, cx } from "cva";
import { KeyboardShortcut } from "../keyboard-shortcut/keyboard-shortcut";
import { Box } from "../layout";
import { Spinner } from "../spinner";
import "./dropdown-menu.scss";

/**
 * Menu representing a set of actions, triggered by a button.
 */
export const DropdownMenu = (
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
) => <DropdownMenuPrimitive.Root {...props} />;

export const DropdownMenuTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
    Omit<
        React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>,
        "asChild"
    >
>((props, forwardRef) => {
    return (
        <DropdownMenuPrimitive.Trigger asChild ref={forwardRef} {...props} />
    );
});

export const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> &
        Pick<
            React.ComponentProps<typeof DropdownMenuPrimitive.Portal>,
            "container"
        > & { hideArrow?: boolean }
>((props, forwardRef) => {
    const {
        children,
        className,
        container,
        sticky = "always",
        collisionPadding = 16,
        sideOffset = 4,
        hideArrow,
        ...rest
    } = props;

    let arrow: React.ReactNode = (
        <DropdownMenuPrimitive.Arrow
            className={cx("sui-c-dropdown-menu__arrow")}
        />
    );

    if (hideArrow) {
        arrow = null;
    }

    const dropdownContentToRender = (
        <DropdownMenuPrimitive.Content
            className={cx("sui-c-dropdown-menu__content", className)}
            sticky={sticky}
            collisionPadding={collisionPadding}
            ref={forwardRef}
            sideOffset={sideOffset}
            {...rest}
        >
            {children}
            {arrow}
        </DropdownMenuPrimitive.Content>
    );

    if (container === null) {
        return dropdownContentToRender;
    }

    return (
        <DropdownMenuPrimitive.Portal container={container}>
            {dropdownContentToRender}
        </DropdownMenuPrimitive.Portal>
    );
});

export const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>((props, forwardRef) => {
    const { children, className, ...rest } = props;

    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.SubContent
                ref={forwardRef}
                {...rest}
                className={cx("sui-c-dropdown-menu__sub-content", className)}
            >
                {children}
                <DropdownMenuPrimitive.Arrow
                    className={cx("sui-c-dropdown-menu__arrow")}
                />
            </DropdownMenuPrimitive.SubContent>
        </DropdownMenuPrimitive.Portal>
    );
});

export const DropdownMenuGroup = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>((props, forwardRef) => {
    const { children, className, ...rest } = props;

    return (
        <DropdownMenuPrimitive.Group
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__group", className)}
            {...rest}
        >
            {children}
        </DropdownMenuPrimitive.Group>
    );
});

const dropdownMenuItemPrefix = cva({
    base: "sui-c-dropdown-menu__item__prefix",
    variants: {
        withContent: {
            true: "sui-c-dropdown-menu__item__prefix--with-content",
        },
    },
});

export const DropdownMenuItemPrefix = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentPropsWithoutRef<typeof Box>
>((props, forwardRef) => {
    const { className, ...rest } = props;
    const childrenCount = React.Children.count(props.children);

    const classes = dropdownMenuItemPrefix({
        class: className,
        withContent: childrenCount > 0,
    });

    return <Box className={classes} ref={forwardRef} {...rest} />;
});

const dropdownMenuItem = cva({
    base: "sui-c-dropdown-menu__item",
    variants: {
        variant: {
            brand: "sui-c-dropdown-menu__item--variant-brand",
            danger: "sui-c-dropdown-menu__item--variant-danger",
            neutral: "sui-c-dropdown-menu__item--variant-neutral",
        },
    },
    defaultVariants: {
        variant: "neutral",
    },
});

export const DropdownMenuItemStyled = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> &
        VariantProps<typeof dropdownMenuItem> & {
            loading?: boolean;
        }
>((props, forwardRef) => {
    const { loading, disabled, variant, className, ...rest } = props;

    return (
        <DropdownMenuPrimitive.Item
            className={dropdownMenuItem({
                variant,
                class: className,
            })}
            disabled={disabled || loading}
            ref={forwardRef}
            {...rest}
        />
    );
});

export const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuItemStyled>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuItemStyled> & {
        leftIcon?: IconDefinitionOrNode;
        shortcut?: React.ReactNode;
    }
>((props, forwardRef) => {
    const { children, leftIcon, loading, shortcut, ...rest } = props;

    let iconToRender;
    if (leftIcon) {
        iconToRender = <FaIconDefinitionOrNode icon={leftIcon} />;
    }

    if (loading) {
        iconToRender = <DropdownMenuItemSpinner />;
    }

    return (
        <DropdownMenuItemStyled ref={forwardRef} loading={loading} {...rest}>
            <DropdownMenuItemPrefix>{iconToRender}</DropdownMenuItemPrefix>
            <DropdownMenuItemContent>{children}</DropdownMenuItemContent>
            <DropdownMenuItemSuffix>
                {shortcut && (
                    <DropdownMenuItemKeyboardShortcut variant="ghost">
                        {shortcut}
                    </DropdownMenuItemKeyboardShortcut>
                )}
            </DropdownMenuItemSuffix>
        </DropdownMenuItemStyled>
    );
});

export const DropdownMenuItemDescription = React.forwardRef<
    React.ElementRef<typeof Paragraph>,
    React.ComponentProps<typeof Paragraph>
>((props, forwardedRef) => {
    const { className, variant = "body-1", ...rest } = props;

    return (
        <Paragraph
            ref={forwardedRef}
            variant={variant}
            className={cx("sui-c-dropdown-menu__item__description", className)}
            {...rest}
        />
    );
});

// Wraps title and description elements
export const DropdownMenuItemContent = React.forwardRef<
    React.ElementRef<typeof Span>,
    React.ComponentPropsWithoutRef<typeof Span>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <Span
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__item__content", className)}
            {...rest}
        />
    );
});

export const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof Span>,
    React.ComponentPropsWithoutRef<typeof Span>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <DropdownMenuPrimitive.Label asChild>
            <Span
                ref={forwardRef}
                className={cx("sui-c-dropdown-menu__label", className)}
                {...rest}
            />
        </DropdownMenuPrimitive.Label>
    );
});

export const DropdownMenuRadioGroup = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <DropdownMenuPrimitive.RadioGroup
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__radio-group", className)}
            {...rest}
        />
    );
});

export const DropdownMenuItemKeyboardShortcut = React.forwardRef<
    React.ElementRef<typeof KeyboardShortcut>,
    React.ComponentPropsWithoutRef<typeof KeyboardShortcut>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <KeyboardShortcut
            ref={forwardRef}
            className={cx(
                "sui-c-dropdown-menu__item__keyboard-shortcut",
                className
            )}
            {...rest}
        />
    );
});

export const DropdownMenuItemSpinner = React.forwardRef<
    React.ElementRef<typeof Spinner>,
    React.ComponentPropsWithoutRef<typeof Spinner>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <Spinner
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__item__spinner", className)}
            {...rest}
        />
    );
});

const [CheckboxGroupContextProvider, useCheckboxGroupContext] = createContext<
    Maybe<UseCheckboxGroupReturn>
>({
    name: "CheckboxGroupContext",
    strict: false,
});

export const DropdownMenuCheckboxGroup = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Group>,
    Omit<
        React.ComponentProps<typeof DropdownMenuPrimitive.Group>,
        "defaultValue"
    > &
        RequiredKeys<
            Omit<UseCheckboxGroupProps, "disabled" | "defaultValue">,
            "value" | "onValueChange"
        > &
        Pick<DropdownMenuPrimitive.DropdownMenuItemProps, "disabled">
>((props, forwardRef) => {
    const {
        value: groupValueProp,
        onValueChange: onGroupValueChange,
        disabled: groupDisabledProp,
        className,
        ...rest
    } = props;

    const context: UseCheckboxGroupReturn = {
        ...useCheckboxGroup({
            value: groupValueProp,
            onValueChange: onGroupValueChange,
            disabled: groupDisabledProp,
        }),
    };

    return (
        <CheckboxGroupContextProvider value={context}>
            <DropdownMenuPrimitive.Group
                ref={forwardRef}
                className={cx("sui-c-dropdown-menu__checkbox-group", className)}
                {...rest}
            />
        </CheckboxGroupContextProvider>
    );
});

export const DropdownMenuRadioItemStyled = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>((props, forwardRef) => {
    const { value, onSelect, className, ...rest } = props;

    return (
        <DropdownMenuPrimitive.RadioItem
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__radio-item", className)}
            data-value={value}
            value={value}
            onSelect={onSelect}
            {...rest}
        />
    );
});

export const DropdownMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuRadioItemStyled>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuRadioItemStyled> & {
        shortcut?: React.ReactNode;
    }
>((props, forwardRef) => {
    const { children, shortcut, ...rest } = props;

    return (
        <DropdownMenuRadioItemStyled ref={forwardRef} {...rest}>
            <DropdownMenuItemPrefix>
                <DropdownMenuPrimitive.ItemIndicator
                    className={cx(
                        "sui-c-dropdown-menu__item-indicator",
                        "sui-c-dropdown-menu__radio-item-indicator",
                        "sui-c-dropdown-menu__radio-item-indicator--checked"
                    )}
                >
                    <FaIcon icon={faCircleSmall} />
                </DropdownMenuPrimitive.ItemIndicator>

                <FaIcon
                    icon={faCircleSmallLight}
                    className={cx(
                        "sui-c-dropdown-menu__item-indicator",
                        "sui-c-dropdown-menu__radio-item-indicator",
                        "sui-c-dropdown-menu__radio-item-indicator--unchecked"
                    )}
                />
            </DropdownMenuItemPrefix>
            <DropdownMenuItemContent>{children}</DropdownMenuItemContent>
            {shortcut && (
                <DropdownMenuItemSuffix>
                    <DropdownMenuItemKeyboardShortcut variant="ghost">
                        {shortcut}
                    </DropdownMenuItemKeyboardShortcut>
                </DropdownMenuItemSuffix>
            )}
        </DropdownMenuRadioItemStyled>
    );
});

export const DropdownMenuItemSuffix = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentPropsWithoutRef<typeof Box>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__item__suffix", className)}
            {...rest}
        />
    );
});

export const DropdownMenuItemIndicatorCheck = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.ItemIndicator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.ItemIndicator>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <DropdownMenuItemPrefix>
            <DropdownMenuPrimitive.ItemIndicator
                ref={forwardRef}
                className={cx("sui-c-dropdown-menu__item-indicator", className)}
                {...rest}
            >
                <FaIcon
                    icon={faMinus}
                    className="sui-c-dropdown-menu__item-indicator__indeterminate-icon"
                />
                <FaIcon
                    icon={faCheck}
                    className="sui-c-dropdown-menu__item-indicator__checked-icon"
                />
            </DropdownMenuPrimitive.ItemIndicator>
        </DropdownMenuItemPrefix>
    );
});

export const DropdownMenuItemIndicatorToggle = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentPropsWithoutRef<typeof Box>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardRef}
            className={cx(
                "sui-c-dropdown-menu__item-switch-indicator",
                className
            )}
            {...rest}
        >
            <Box className="sui-c-dropdown-menu__item-switch-indicator__thumb">
                <FaIcon
                    icon={faCheck}
                    className="sui-c-dropdown-menu__item-switch-indicator__thumb-icon"
                    size="xs"
                />
            </Box>
        </Box>
    );
});

const dropdownMenuCheckboxItem = cva({
    base: "sui-c-dropdown-menu__checkbox-item",
    variants: {
        indicatorVariant: {
            check: "sui-c-dropdown-menu__checkbox-item--variant-check",
            switch: "sui-c-dropdown-menu__checkbox-item--variant-switch",
        },
    },
    defaultVariants: {
        indicatorVariant: "check",
    },
});

// More composable version of the Checkbox item
export const DropdownMenuCheckboxItemStyled = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<
        typeof DropdownMenuPrimitive.CheckboxItem
    > & {
        value?: string;
    } & VariantProps<typeof dropdownMenuCheckboxItem>
>((props, forwardRef) => {
    const {
        children,
        className,
        value,
        indicatorVariant = "switch",
        checked: checkedProp,
        onCheckedChange: onCheckedChangeProp,
        disabled: disabledProp,
        onSelect,
        ...rest
    } = props;

    const groupContext = useCheckboxGroupContext();

    let checked = checkedProp;
    let onCheckedChange = onCheckedChangeProp;
    let disabled = disabledProp;

    if (groupContext) {
        if (isUndefined(disabled)) {
            disabled = groupContext.groupDisabled;
        }

        if (value) {
            if (isUndefined(checked)) {
                checked = groupContext.isChecked(value);
            }

            onCheckedChange = callAllHandlers(onCheckedChange, () => {
                groupContext.onCheckedChange(value);
            });
        }
    }

    return (
        <DropdownMenuPrimitive.CheckboxItem
            ref={forwardRef}
            className={dropdownMenuCheckboxItem({
                indicatorVariant,
                class: className,
            })}
            checked={checked}
            onCheckedChange={onCheckedChange}
            onSelect={onSelect}
            data-value={value}
            disabled={disabled}
            {...rest}
        >
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
});

// Simpler, less composable checkbox item that allows "shortcut" and "indicatorVariant" props
export const DropdownMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuCheckboxItemStyled>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItemStyled> & {
        shortcut?: React.ReactNode;
    } & VariantProps<typeof dropdownMenuCheckboxItem>
>((props, forwardRef) => {
    const { shortcut, indicatorVariant = "switch", children, ...rest } = props;

    // The suffix holds keyboard shortcuts and the switch indicator
    const shouldRenderItemSuffix = shortcut || indicatorVariant === "switch";

    return (
        <DropdownMenuCheckboxItemStyled
            ref={forwardRef}
            indicatorVariant={indicatorVariant}
            {...rest}
        >
            {indicatorVariant === "check" && (
                <DropdownMenuItemPrefix>
                    <DropdownMenuItemIndicatorCheck />
                </DropdownMenuItemPrefix>
            )}
            <DropdownMenuItemContent>{children}</DropdownMenuItemContent>
            {shouldRenderItemSuffix && (
                <DropdownMenuItemSuffix>
                    {shortcut && (
                        <DropdownMenuItemKeyboardShortcut variant="ghost">
                            {shortcut}
                        </DropdownMenuItemKeyboardShortcut>
                    )}
                    {indicatorVariant === "switch" && (
                        <DropdownMenuItemIndicatorToggle />
                    )}
                </DropdownMenuItemSuffix>
            )}
        </DropdownMenuCheckboxItemStyled>
    );
});

export const DropdownMenuSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>((props, forwardRef) => {
    const { className, ...rest } = props;

    return (
        <DropdownMenuPrimitive.Separator
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__separator", className)}
            {...rest}
        />
    );
});

export function DropdownMenuSub(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>
) {
    return <DropdownMenuPrimitive.Sub {...props} />;
}

export const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
        leftIcon?: IconDefinitionOrNode;
    }
>((props, forwardRef) => {
    const { children, className, leftIcon, ...rest } = props;

    let iconToRender;
    if (leftIcon) {
        iconToRender = <FaIconDefinitionOrNode icon={leftIcon} />;
    }

    return (
        <DropdownMenuPrimitive.SubTrigger
            ref={forwardRef}
            className={cx("sui-c-dropdown-menu__sub__trigger", className)}
            {...rest}
        >
            <DropdownMenuItemPrefix>{iconToRender}</DropdownMenuItemPrefix>
            <DropdownMenuItemContent>{children}</DropdownMenuItemContent>
            <DropdownMenuItemSuffix>
                <FaIcon
                    className="sui-c-dropdown-menu__sub__trigger__icon"
                    icon={faChevronRight}
                />
            </DropdownMenuItemSuffix>
        </DropdownMenuPrimitive.SubTrigger>
    );
});
