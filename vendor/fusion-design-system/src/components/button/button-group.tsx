import type { Button } from "./button";
import { boxVariants } from "@singlestore/fusion/components/layout";

import type { VariantProps } from "cva";
import { cva } from "cva";
import React from "react";

import "./button-group.scss";
import { createContext } from "@singlestore/fusion/react-utils/context";
import { split } from "@singlestore/fusion/utils/object";

export const buttonGroupVariants = {
    ...boxVariants,
    /**
     * If `true`, the borderRadius of button that are direct children will be altered
     * to look flushed together
     */
    attached: {
        true: "sui-c-button__group--attached",
    },
};

const buttonGroup = cva({
    base: "sui-c-button__group",
    variants: buttonGroupVariants,
});

export const buttonGroupVariantPropsKeys = Object.keys(
    buttonGroupVariants
) as Array<keyof typeof buttonGroupVariants>;

const passedThroughButtonPropsKeys = ["variant", "size", "disabled"] as const;

type ForwardedButtonProps = Pick<
    React.ComponentProps<typeof Button>,
    (typeof passedThroughButtonPropsKeys)[number]
>;

export type ButtonGroupProps = VariantProps<typeof buttonGroup> &
    ForwardedButtonProps &
    React.ComponentProps<"div">;

type ButtonGroupContext = ForwardedButtonProps;

const [ButtonGroupProvider, useButtonGroup, ButtonGroupContext] =
    createContext<ButtonGroupContext>({
        strict: false,
        name: "ButtonGroupContext",
    });

export { useButtonGroup, ButtonGroupContext };

/**
 * Group buttons together, allowing for props to be forwarded to the child buttons.
 *
 * By default, the buttons will be spaced 1x apart.
 *
 * Pass the `attached` prop to make the buttons flush together and remove the necessary border radius (for example, a button that also has a dropdown menu trigger attached to it).
 *
 * Passing `disabled`, `size`, and `variant` props to the `ButtonGroup` will forward them to every child button. Any other props will be passed to the wrapping `div`.
 *
 * Props set directly to the child buttons will take precedence over the props set on the `ButtonGroup`.
 */
export const ButtonGroup = React.forwardRef<
    React.ElementRef<"div">,
    ButtonGroupProps
>((props, ref) => {
    const [
        {
            gap = props.attached ? undefined : "1x",
            alignItems = "center",
            ...restButtonGroupVariantProps
        },
        nonButtonGroupVariantProps,
    ] = split(props, buttonGroupVariantPropsKeys);

    const [forwardedButtonProps, divProps] = split(nonButtonGroupVariantProps, [
        ...passedThroughButtonPropsKeys,
    ]);

    const { className, ...rest } = divProps;

    const _className = buttonGroup({
        ...restButtonGroupVariantProps,
        gap,
        alignItems,
        class: className,
    });

    return (
        <ButtonGroupProvider value={{ ...forwardedButtonProps }}>
            <div ref={ref} role="group" className={_className} {...rest} />
        </ButtonGroupProvider>
    );
});
