import { faCircleSmall as faCircleSmallLight } from "@fortawesome/sharp-light-svg-icons";
import {
    faChevronDown,
    faCircleSmall,
} from "@fortawesome/sharp-solid-svg-icons";
import {
    DropdownMenu,
    DropdownMenuCheckboxGroup,
    DropdownMenuCheckboxItem,
    DropdownMenuCheckboxItemStyled,
    DropdownMenuContent,
    DropdownMenuItemContent,
    DropdownMenuItemPrefix,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@singlestore/fusion/components/dropdown-menu";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import {
    getSelectAllCheckedState,
    getSelectAllHandler,
} from "@singlestore/fusion/react-utils/use-checkbox-group";
import { cva, cx, type VariantProps } from "cva";
import * as React from "react";

import { Badge } from "@singlestore/fusion/components/badge";
import { Button } from "@singlestore/fusion/components/button";
import {
    Box,
    box,
    boxVariantPropsKeys,
    boxVariants,
    Flex,
} from "@singlestore/fusion/components/layout";
import { Span } from "@singlestore/fusion/components/typography";
import { createContext } from "@singlestore/fusion/react-utils/context";
import { dataAttr } from "@singlestore/fusion/utils/dom";
import { split } from "@singlestore/fusion/utils/object";

import "./multi-select.scss";

type Item<T extends string = string> = {
    value: T;
    /** How the value should be displayed when selected in the TriggerButton */
    label?: string;
};

type MultiSelectContextValue<T extends string = string> = {
    /** The currently selected values */
    value: Array<T>;
    /** Callback fired when the selection changes */
    onValueChange: (value: Array<T>) => void;
    /** All possible selectable items */
    allItems: Array<Item<T>>;
    disabled?: boolean;
    loading?: boolean;
    /** Determines the visual style. */
    variant?: "select" | "filter";
};

const [MultiSelectProvider, useMultiSelectContextBase] = createContext<
    MultiSelectContextValue<any>
>({
    name: "MultiSelectContext",
});

function useMultiSelectContext<T extends string = string>() {
    return useMultiSelectContextBase() as MultiSelectContextValue<T>;
}

type MultiSelectProps<T extends string = string> =
    MultiSelectContextValue<T> & {
        children: React.ReactNode;
    } & React.ComponentProps<typeof DropdownMenu>;

/**
 * MultiSelect is built on top of DropdownMenu, but provides a higher-level API
 * and opinionated UX for multi-selection.
 */
export function MultiSelect<T extends string = string>(
    props: MultiSelectProps<T>
) {
    const {
        value,
        onValueChange,
        disabled,
        loading,
        children,
        allItems,
        variant = "select",
        ...dropdownMenuProps
    } = props;

    const contextValue = React.useMemo(
        () => ({
            value,
            onValueChange,
            disabled,
            loading,
            allItems,
            variant,
        }),
        [value, onValueChange, disabled, loading, allItems, variant]
    );

    return (
        <MultiSelectProvider value={contextValue}>
            <DropdownMenu {...dropdownMenuProps}>{children}</DropdownMenu>
        </MultiSelectProvider>
    );
}

const multiSelectTriggerButtonVariants = {
    ...boxVariants,
    /**
     * The style variant of the trigger button.
     */
    variant: {
        filter: "sui-c-multi-select__trigger-button--variant-filter",
        select: "sui-c-multi-select__trigger-button--variant-select",
    },
    selected: {
        true: "sui-c-multi-select__trigger-button--selected",
    },
};

export const multiSelectTriggerButtonVariantsPropsKeys = Object.keys(
    multiSelectTriggerButtonVariants
) as Array<keyof typeof multiSelectTriggerButtonVariants>;

const multiSelectTriggerButton = cva({
    base: "sui-c-multi-select__trigger-button",
    variants: multiSelectTriggerButtonVariants,
    defaultVariants: {
        variant: "select",
        selected: false,
    },
});

type MultiSelectTriggerButtonProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuTrigger
> &
    VariantProps<typeof multiSelectTriggerButton>;

/**
 * Renders the multi-select button, which is the button that the user interacts
 * with to open the multi-select content
 */
export const MultiSelectTriggerButton = React.forwardRef<
    React.ElementRef<typeof DropdownMenuTrigger>,
    Omit<MultiSelectTriggerButtonProps, "asChild">
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [buttonVariantProps, elementProps] = split(
        rest,
        multiSelectTriggerButtonVariantsPropsKeys
    );
    const {
        disabled: contextDisabled,
        loading: contextLoading,
        value,
        variant: contextVariant,
        allItems,
    } = useMultiSelectContext();
    const { disabled = contextDisabled, ...triggerProps } = elementProps;

    const variant = contextVariant || buttonVariantProps.variant;

    // Filter variant: highlight when any items are individually checked (active filter).
    // Select variant: highlight when some (but not all) items are selected (partial).
    const isFilterActive =
        variant === "filter" && value.length > 0 && allItems.length > 0;
    const hasSomeSelected = value.length > 0 && value.length < allItems.length;

    const selected = variant === "filter" ? isFilterActive : hasSomeSelected;

    const isDisabled = disabled || allItems.length === 0;

    return (
        <DropdownMenuTrigger
            ref={forwardedRef}
            disabled={isDisabled}
            {...triggerProps}
        >
            <Button
                variant="outline-neutral"
                className={multiSelectTriggerButton({
                    ...buttonVariantProps,
                    variant,
                    selected,
                    class: className,
                })}
                rightIcon={faChevronDown}
                loading={contextLoading}
            >
                {children}
            </Button>
        </DropdownMenuTrigger>
    );
});

type MultiSelectValueProps = React.ComponentPropsWithoutRef<typeof Box> & {
    /** Maximum number of items to show before displaying a "+X more" pill */
    maxVisible?: number;
    /** Custom "All" text when all options are selected */
    allSelectedText?: string;
    /** Whether to show "All" text when all available options are selected */
    showAllSelected?: boolean;
    /** Optional name to prefix the value, like a filter label. */
    prefixLabel?: string;
    /** Text to display when no items are selected */
    placeholder?: string;
};

/**
 * Shows selected items, a "+X more" badge if needed, or a placeholder. Supports
 * prop `prefixLabel` to make this component feel more like a filter.
 */
export const MultiSelectValue = React.forwardRef<
    React.ElementRef<typeof Box>,
    MultiSelectValueProps
>((props, forwardedRef) => {
    const { value, allItems, variant } = useMultiSelectContext();

    const {
        placeholder = "Select options",
        className,
        maxVisible = 1,
        allSelectedText = "All",
        showAllSelected = true,
        prefixLabel,
        ...rest
    } = props;
    const [boxVariantProps] = split(rest, boxVariantPropsKeys);

    let prefix;
    if (prefixLabel) {
        prefix = <Span fontWeight="regular">{prefixLabel}</Span>;
    }

    let content;

    // Filter variant: empty selection means "All" (no filter applied)
    if (variant === "filter" && value.length === 0 && allItems.length > 0) {
        content = (
            <Box ellipsis>
                {prefix && <>{prefix}: </>}
                {allSelectedText}
            </Box>
        );
    } else if (
        // Select variant only: show "All" when every item is explicitly selected.
        // Filter variant skips this -- value=[all items] is a distinct state from
        // value=[] ("All"), and should show individual items to stay honest.
        variant !== "filter" &&
        showAllSelected &&
        value.length === allItems.length &&
        allItems.length > 0
    ) {
        content = (
            <Box ellipsis>
                {prefix && <>{prefix}: </>}
                {allSelectedText}
            </Box>
        );
    } else if (value.length > 0) {
        const visibleItems = value.slice(0, maxVisible).map((selectedValue) => {
            const item = allItems.find((i) => i.value === selectedValue);
            if (!item) {
                return selectedValue;
            }
            return item.label ? item.label : selectedValue;
        });

        let moreBadge;
        if (value.length > maxVisible) {
            moreBadge = (
                <Badge variant="secondary">+{value.length - maxVisible}</Badge>
            );
        }

        content = (
            <Flex gap="1x" alignItems="center">
                <Box ellipsis>
                    {prefix && <>{prefix}: </>}
                    {visibleItems.join(", ")}
                </Box>
                {moreBadge}
            </Flex>
        );
    } else {
        // Empty state: show placeholder (select variant) or prefix only (filter variant)
        const emptyText = !prefixLabel ? placeholder : undefined;

        let boxContent;
        if (emptyText && prefix) {
            boxContent = (
                <>
                    {prefix}: {emptyText}
                </>
            );
        } else if (emptyText) {
            boxContent = emptyText;
        } else {
            boxContent = prefix;
        }

        content = <Box ellipsis>{boxContent}</Box>;
    }

    return (
        <Box
            ref={forwardedRef}
            className={className}
            flexShrink="1"
            minWidth="0"
            {...boxVariantProps}
        >
            {content}
        </Box>
    );
});

/**
 * Container for multi-select dropdown options. Groups items in a checkbox group
 * for multi-selection, wiring selection state and change handlers via context.
 */
export const MultiSelectContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuContent>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuContent> &
        VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, contentProps] = split(rest, boxVariantPropsKeys);
    const { value, onValueChange } = useMultiSelectContext();

    return (
        <DropdownMenuContent
            ref={forwardedRef}
            align="start"
            className={box({
                ...boxVariantProps,
                class: className,
            })}
            {...contentProps}
        >
            <DropdownMenuCheckboxGroup
                value={value}
                onValueChange={onValueChange}
            >
                {children}
            </DropdownMenuCheckboxGroup>
        </DropdownMenuContent>
    );
});

/**
 * Renders an item in the opened multi-select content.
 */
export const MultiSelectItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuCheckboxItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem> &
        VariantProps<typeof box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);
    const { disabled: contextDisabled } = useMultiSelectContext();
    const {
        value,
        disabled = contextDisabled,
        onSelect,
        ...itemProps
    } = elementProps;

    return (
        <DropdownMenuCheckboxItem
            ref={forwardedRef}
            indicatorVariant="check"
            disabled={disabled}
            value={value}
            onSelect={(event) => {
                // Keep the menu open
                event.preventDefault();
                onSelect?.(event);
            }}
            className={box({
                ...boxVariantProps,
                class: className,
            })}
            {...itemProps}
        >
            {children}
        </DropdownMenuCheckboxItem>
    );
});

export const MultiSelectSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuSeparator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuSeparator>
>((props, forwardedRef) => {
    const { className, ...rest } = props;
    return (
        <DropdownMenuSeparator
            ref={forwardedRef}
            className={className}
            {...rest}
        />
    );
});

export type MultiSelectAllProps = Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem>,
    "checked" | "onCheckedChange" | "value"
> & {
    onSelect?: (event: Event) => void;
} & VariantProps<typeof box>;

type InternalAllProps = {
    selectedValues: Array<string>;
    onValueChange: (value: Array<string>) => void;
    allItems: Array<Item>;
    isDisabled: boolean;
    className: string;
    children: React.ReactNode;
    handleSelect: (event: Event) => void;
    elementProps: Record<string, unknown>;
};

/**
 * Filter variant: "All" is a radio-style clear button. Clicking it clears all
 * checkbox selections (value becomes []). It appears selected when no items are
 * individually checked. The label defaults to "All" but can be overridden via children.
 */
const FilterAll = React.forwardRef<
    React.ElementRef<typeof DropdownMenuCheckboxItemStyled>,
    InternalAllProps
>((props, ref) => {
    const {
        selectedValues,
        onValueChange,
        isDisabled,
        className,
        children,
        handleSelect,
        elementProps,
    } = props;
    const isAllSelected = selectedValues.length === 0;

    return (
        <DropdownMenuCheckboxItemStyled
            ref={ref}
            {...elementProps}
            indicatorVariant="check"
            disabled={isDisabled}
            checked={isAllSelected}
            onSelect={handleSelect}
            onCheckedChange={() => onValueChange([])}
            className={className}
            data-select-all={dataAttr(true)}
        >
            <DropdownMenuItemPrefix>
                <FaIcon
                    icon={isAllSelected ? faCircleSmall : faCircleSmallLight}
                    className={cx(
                        "sui-c-dropdown-menu__item-indicator",
                        "sui-c-dropdown-menu__radio-item-indicator",
                        isAllSelected
                            ? "sui-c-dropdown-menu__radio-item-indicator--checked"
                            : "sui-c-dropdown-menu__radio-item-indicator--unchecked"
                    )}
                />
            </DropdownMenuItemPrefix>
            <DropdownMenuItemContent>{children}</DropdownMenuItemContent>
        </DropdownMenuCheckboxItemStyled>
    );
});

/**
 * Select variant: Traditional tri-state "Select All" checkbox (unchecked /
 * indeterminate / checked). Toggling it selects or deselects every item.
 * The label defaults to "All" but can be overridden via children.
 */
const FormSelectAll = React.forwardRef<
    React.ElementRef<typeof DropdownMenuCheckboxItem>,
    InternalAllProps
>((props, ref) => {
    const {
        selectedValues,
        onValueChange,
        allItems,
        isDisabled,
        className,
        children,
        handleSelect,
        elementProps,
    } = props;

    const allPossibleValues = allItems.map((item) => item.value);
    const selectAllCheckedState = getSelectAllCheckedState(
        selectedValues.length,
        allItems.length
    );
    const handleSelectAllChange = getSelectAllHandler(
        onValueChange,
        allPossibleValues
    );

    return (
        <DropdownMenuCheckboxItem
            {...elementProps}
            indicatorVariant="check"
            ref={ref}
            disabled={isDisabled}
            checked={selectAllCheckedState}
            onSelect={handleSelect}
            onCheckedChange={handleSelectAllChange}
            className={className}
            data-select-all={dataAttr(true)}
        >
            {children}
        </DropdownMenuCheckboxItem>
    );
});

/**
 * Renders the "All" option at the top of the multi-select content.
 * Delegates to `FilterAll` or `FormSelectAll` based on the variant.
 *
 * @see FilterAll — radio-style clear button for `variant="filter"`
 * @see FormSelectAll — tri-state checkbox for `variant="select"`
 */
export const MultiSelectAll = React.forwardRef<
    React.ElementRef<typeof DropdownMenuCheckboxItem>,
    MultiSelectAllProps
>((props, forwardedRef) => {
    const {
        value: selectedValues,
        onValueChange,
        allItems,
        disabled: contextDisabled,
        variant,
    } = useMultiSelectContext();
    const { className, children = "All", onSelect, ...rest } = props;
    const [boxVariantProps, elementProps] = split(rest, boxVariantPropsKeys);

    const isDisabled = contextDisabled || allItems.length === 0;
    const boxClassName = box({ ...boxVariantProps, class: className });
    const handleSelect = (event: Event) => {
        event.preventDefault();
        onSelect?.(event);
    };

    const sharedProps: InternalAllProps = {
        selectedValues,
        onValueChange,
        allItems,
        isDisabled,
        className: boxClassName,
        children,
        handleSelect,
        elementProps,
    };

    if (variant === "filter") {
        return <FilterAll ref={forwardedRef} {...sharedProps} />;
    }

    return <FormSelectAll ref={forwardedRef} {...sharedProps} />;
});
