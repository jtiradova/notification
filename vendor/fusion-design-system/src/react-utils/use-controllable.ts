import { runIfFn } from "@singlestore/fusion/utils/function";
import React from "react";

export function useControllableProp<T>(prop: Maybe<T>, state: T) {
    const isControlled = prop !== undefined;
    const value = isControlled && typeof prop !== "undefined" ? prop : state;
    return [isControlled, value] as const;
}

export type UseControllableStateProps<T> = {
    /**
     * The value to used in controlled mode
     */
    value?: T;
    /**
     * The initial value to be used, in uncontrolled mode
     */
    defaultValue?: T | (() => T);
    /**
     * The callback fired when the value changes
     */
    onValueChange?: (value: T) => void;
    /**
     * The function that determines if the state should be updated
     */
    shouldUpdate?: (prev: T, next: T) => boolean;
};

/**
 * React hook for using controlling component state.
 * @param props
 */
export function useControllableState<T>(props: UseControllableStateProps<T>) {
    const {
        value: valueProp,
        defaultValue,
        onValueChange,
        shouldUpdate = (prev, next) => prev !== next,
    } = props;

    const [valueState, setValue] = React.useState(defaultValue as T);

    const isControlled = valueProp !== undefined;
    const value = isControlled ? (valueProp as T) : valueState;

    const updateValue = React.useCallback(
        (next: React.SetStateAction<T>) => {
            const nextValue = runIfFn(next, value);

            if (!shouldUpdate(value, nextValue)) {
                return;
            }

            if (!isControlled) {
                setValue(nextValue);
            }

            onValueChange?.(nextValue);
        },
        [isControlled, onValueChange, value, shouldUpdate]
    );

    return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
