import { useControllableState } from "@singlestore/fusion/react-utils/use-controllable";
import React from "react";

export function getSelectAllCheckedState(
    checkedItemCount: number,
    totalItemCount: number
) {
    if (checkedItemCount === 0) {
        return false;
    }

    if (checkedItemCount === totalItemCount) {
        return true;
    }

    if (checkedItemCount > 0) {
        return "indeterminate";
    }
}

export function getSelectAllHandler(
    setGroupValue: (value: Array<string>) => void,
    allItems: Array<string>
) {
    return (checked: boolean | "indeterminate") => {
        if (checked === true) {
            setGroupValue(allItems);
        }

        if (checked === false) {
            setGroupValue([]);
        }
    };
}

export type UseCheckboxGroupProps = {
    /**
     * The value of the checkbox group
     */
    value?: Array<string>;
    /**
     * The initial value of the checkbox group
     */
    defaultValue?: Array<string>;
    /**
     * The callback fired when any children Checkbox is checked or unchecked
     */
    onValueChange?(value: Array<string>): void;
    /**
     * If `true`, all wrapped checkbox inputs will be disabled
     *
     * @default false
     */
    disabled?: boolean;
};

export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
    const {
        defaultValue,
        value: valueProp,
        onValueChange,
        disabled: groupDisabled,
    } = props;

    const [groupValue, setGroupValue] = useControllableState({
        defaultValue: defaultValue || [],
        value: valueProp,
        onValueChange,
    });

    const onCheckedChange = React.useCallback(
        (value: string) => {
            if (!groupValue) return;

            const checked = !groupValue.includes(value);

            const selectedValue = value;

            const nextGroupValue = checked
                ? [...groupValue, selectedValue]
                : groupValue.filter((v) => String(v) !== String(selectedValue));

            setGroupValue(nextGroupValue);
        },
        [setGroupValue, groupValue]
    );

    const isChecked = (value: string) =>
        groupValue.some((val) => String(value) === String(val));

    return {
        groupValue,
        setGroupValue,
        groupDisabled,

        // Checkbox
        isChecked,
        onCheckedChange,
    };
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;
