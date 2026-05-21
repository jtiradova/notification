import {
    faCheck,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/sharp-solid-svg-icons";
import * as SelectPrimitive from "@singlestore/fusion/components/select/primitive";
import type { VariantProps } from "cva";
import { cx, cva } from "cva";
import React from "react";

import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import type { Box } from "@singlestore/fusion/components/layout";
import {
    box,
    boxVariantPropsKeys,
} from "@singlestore/fusion/components/layout";
import { Paragraph, Span } from "@singlestore/fusion/components/typography";
import { split } from "@singlestore/fusion/utils/object";
import "./select.scss";
import { isStringishChildren } from "@singlestore/fusion/react-utils/children";

type SelectProps<T extends string = string> = Pick<
    SelectPrimitive.SelectProps,
    | "name"
    | "autoComplete"
    | "disabled"
    | "required"
    | "defaultOpen"
    | "open"
    | "onOpenChange"
    | "children"
> & {
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void;
};

/**
 * Displays a list of options for the user to select from, used in forms.
 *
 * This is the root component that should be used to wrap the
 * select trigger and content, and controls the data shared between all other parts.
 *
 * Supports a generic type parameter to narrow the value type beyond `string`.
 *
 * @example
 * ```tsx
 * type Color = "red" | "blue" | "green";
 * <Select<Color> value={color} onValueChange={setColor}>
 *   ...
 * </Select>
 * ```
 */
export function Select<T extends string = string>(props: SelectProps<T>) {
    return <SelectPrimitive.Root {...(props as SelectProps)} />;
}

/**
 * Renders an item in the opened select content.
 *
 * This is similar to the native `<option>` element, but it can be customised with CSS.
 *
 * Each item should have a unique `value`.
 *
 * By default, if `children` is a string, it will be shown in the `SelectTrigger` when selected.
 *
 * You can also add `<SelectItemText>` manually if you want `children` to include other
 * content which shouldn't be shown in the trigger when selected.
 */
export const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    SelectPrimitive.SelectItemProps & VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    return (
        <SelectPrimitive.Item
            ref={forwardedRef}
            className={box({
                ...boxVariantProps,
                class: cx("sui-c-select__item", className),
            })}
            {...elementProps}
        >
            <SelectPrimitive.ItemIndicator className="sui-c-select__item-indicator">
                <FaIcon icon={faCheck} />
            </SelectPrimitive.ItemIndicator>
            {(() => {
                if (isStringishChildren(children)) {
                    return <SelectItemText>{children}</SelectItemText>;
                }

                // MCDB-21506 - TODO: Throw error if children does not contain `SelectItemText`

                return children;
            })()}
        </SelectPrimitive.Item>
    );
});

/**
 * Wraps the text of a `SelectItem` to indicate what you want to be shown in the `SelectTrigger` when selected.
 *
 * This should not be styled directly.
 */
export const SelectItemText = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ItemText>,
    SelectPrimitive.SelectItemTextProps & VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    return (
        <SelectPrimitive.ItemText
            ref={forwardedRef}
            className={box({
                ...boxVariantProps,
                class: cx("sui-c-select__item-text", className),
            })}
            {...elementProps}
        >
            {children}
        </SelectPrimitive.ItemText>
    );
});

/**
 * Renders an item in the opened select content with a title and description,
 * it should always wrap a `SelectDescribedItemTitle` and `SelectDescribedItemDescription`.
 *
 * This is similar to the native `<option>` element, but it can be customised with CSS. 
 * 
 * Each item should have a unique `value`.

 * By default, it's child `SelectDescribedItemTitle`'s children will be shown in the select trigger when selected.
 */
export const SelectDescribedItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentProps<typeof SelectPrimitive.Item> & VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    return (
        <SelectPrimitive.Item
            ref={forwardedRef}
            className={box({
                ...boxVariantProps,
                class: cx("sui-c-select__described-item", className),
            })}
            {...elementProps}
        >
            <SelectPrimitive.ItemIndicator className="sui-c-select__item-indicator">
                <FaIcon icon={faCheck} />
            </SelectPrimitive.ItemIndicator>

            <div>{children}</div>
        </SelectPrimitive.Item>
    );
});

/**
 * The title of the `SelectDescribedItem`, typically this is the text that will be shown in the `SelectTrigger` when selected.
 *
 * For this reason, it should wrap a `SelectItemText`.
 *
 * If `children` is a string, `<SelectItemText>` will be automatically added.
 */
export const SelectDescribedItemTitle = React.forwardRef<
    React.ElementRef<typeof Span>,
    React.ComponentProps<typeof Span>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;

    return (
        <Span
            ref={forwardedRef}
            className={cx("sui-c-select__described-item-title", className)}
            {...rest}
        >
            {(() => {
                if (isStringishChildren(children)) {
                    return <SelectItemText>{children}</SelectItemText>;
                }

                // MCDB-21506 - TODO: Throw error if children does not contain `SelectItemText`

                return children;
            })()}
        </Span>
    );
});

/**
 * The description of the `SelectDescribedItem`, typically this is NOT shown in the `SelectTrigger` when selected.
 */
export const SelectDescribedItemDescription = React.forwardRef<
    React.ElementRef<typeof Paragraph>,
    React.ComponentProps<typeof Paragraph>
>((props, forwardedRef) => {
    const { className, variant = "body-1", ...rest } = props;

    return (
        <Paragraph
            ref={forwardedRef}
            variant={variant}
            className={cx(
                "sui-c-select__described-item-description",
                className
            )}
            {...rest}
        />
    );
});

/**
 * Renders the select value, which is the text that is shown in the `SelectTrigger` when an item is selected
 * (or the placeholder if no items are selected)
 */
export const SelectValue = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Value>,
    SelectPrimitive.SelectValueProps
>((props, forwardedRef) => {
    const { placeholder = "Select an option", className, ...rest } = props;

    return (
        <SelectPrimitive.Value
            ref={forwardedRef}
            placeholder={placeholder}
            className={cx("sui-c-select__value", className)}
            {...rest}
        />
    );
});

const selectTrigger = cva({
    base: "sui-c-select__trigger",
    variants: {
        variant: {
            form: "sui-c-select__trigger--variant-form",
            button: "sui-c-select__trigger--variant-button",
        },
    },
    defaultVariants: {
        variant: "form",
    },
});

/**
 * Renders the select trigger, which is the button that the user interacts with to open the select content.
 *
 * This should optionally wrap a `SelectValue` if you want to customise the placeholder.
 *
 * If no `children` are provided, it will render a `SelectValue` with a default placeholder.
 */
export const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    SelectPrimitive.SelectTriggerProps &
        VariantProps<typeof box> &
        VariantProps<typeof selectTrigger> & {
            customIcon?: React.ReactNode;
        }
>((props, forwardedRef) => {
    const { className, children, variant, customIcon, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    let icon: React.ReactNode = <FaIcon icon={faChevronDown} />;
    if (customIcon) {
        icon = customIcon;
    }

    return (
        <SelectPrimitive.Trigger
            ref={forwardedRef}
            className={cx(
                selectTrigger({
                    variant,
                }),
                box({
                    ...boxVariantProps,
                }),
                className
            )}
            {...elementProps}
        >
            {(() => {
                if (!children) {
                    return <SelectValue />;
                }

                return children;
            })()}
            <SelectPrimitive.Icon
                asChild
                className="sui-c-select__trigger-icon"
            >
                {icon}
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
});

/**
 * Used to render the portal to another position in the dom. By default,
 * will append to the `<body>` element, but you can pass a HTMLElement to
 * the `container` prop to control that.
 */
export const SelectPortal = SelectPrimitive.Portal;

/**
 * Renders the select content, which is the list of items that is shown when the select is open.
 *
 * This should wrap a `SelectItem` or `SelectDescribedItem` for each item in the list.
 */
export const SelectContent = React.forwardRef<
    React.ElementRef<typeof Box>,
    SelectPrimitive.SelectContentProps & VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, contentProps] = split(rest, boxVariantPropsKeys);

    return (
        <SelectPrimitive.Content
            ref={forwardedRef}
            sideOffset={4}
            position="popper"
            className={box({
                ...boxVariantProps,
                class: cx("sui-c-select__content", className),
            })}
            {...contentProps}
        >
            <SelectPrimitive.ScrollUpButton className="sui-c-select__scroll-up-button">
                <FaIcon icon={faChevronUp} />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="sui-c-select__viewport">
                {children}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="sui-c-select__scroll-down-button">
                <FaIcon icon={faChevronDown} />
            </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
    );
});

/**
 * Renders a group of items in the select content.
 *
 * This is useful for grouping items together, for example by category, and then rendering a `SelectGroupLabel` above the group.
 *
 * This should wrap a `SelectItem` or `SelectDescribedItem` for each item in the group.
 */
export const SelectGroup = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Group>,
    SelectPrimitive.SelectGroupProps & VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    return (
        <SelectPrimitive.Group
            ref={forwardedRef}
            className={box({
                ...boxVariantProps,
                class: cx("sui-c-select__group", className),
            })}
            {...elementProps}
        >
            {children}
        </SelectPrimitive.Group>
    );
});

/**
 * Renders a label for a group of items in the select content.
 *
 * This should always be wrapped by a `SelectGroup`.
 */
export const SelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    SelectPrimitive.SelectLabelProps & VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    return (
        <SelectPrimitive.Label
            ref={forwardedRef}
            className={box({
                ...boxVariantProps,
                class: cx("sui-c-select__label", className),
            })}
            {...elementProps}
        >
            {children}
        </SelectPrimitive.Label>
    );
});

/**
 * Renders a separator between groups or items in the select content.
 */
export const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    SelectPrimitive.SelectSeparatorProps & VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    return (
        <SelectPrimitive.Separator
            ref={forwardedRef}
            className={box({
                ...boxVariantProps,
                class: cx("sui-c-select__separator", className),
            })}
            {...elementProps}
        >
            {children}
        </SelectPrimitive.Separator>
    );
});
