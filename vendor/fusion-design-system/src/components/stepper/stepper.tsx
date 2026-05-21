import {
    Box,
    boxVariantPropsKeys,
} from "@singlestore/fusion/components/layout";
import { split } from "@singlestore/fusion/utils/object";
import { cx } from "cva";
import React from "react";
import type { Orientation, StepStatusType, StepVariant } from "./step-context";
import { StepContextProvider } from "./step-context";
import "./stepper.scss";

export type StepperProps = React.ComponentProps<typeof Box> & {
    /**
     * The current step index
     */
    index: number;
    /**
     * The orientation of the stepper
     * @default horizontal
     * @type "horizontal" | "vertical"
     */
    orientation?: Orientation;
    /**
     * The style variant to apply to every Step component
     * @default numbered
     * @type "numbered" | "subdued"
     */
    variant?: StepVariant;
    /**
     */
    children: React.ReactNode;
};

export const Stepper = React.forwardRef<
    React.ElementRef<typeof Box>,
    StepperProps
>((props: StepperProps, ref) => {
    const [variantProps, ownProps] = split(props, boxVariantPropsKeys);
    const {
        children,
        index,
        orientation = "horizontal",
        variant,
        className,
        ...restProps
    } = ownProps;

    const stepElements = React.Children.toArray(children);

    const stepCount = stepElements.length;

    function getStatus(step: number): StepStatusType {
        if (step < index) return "complete";
        if (step > index) return "incomplete";
        return "current";
    }

    return (
        <Box
            ref={ref}
            aria-label="Progress"
            className={cx("sui-c-stepper", className)}
            data-orientation={orientation}
            {...restProps}
            {...variantProps}
        >
            {stepElements.map((child, index) => (
                <StepContextProvider
                    key={index}
                    value={{
                        index,
                        variant,
                        status: getStatus(index),
                        orientation,
                        count: stepCount,
                        isFirst: index === 0,
                        isLast: index === stepCount - 1,
                    }}
                >
                    {child}
                </StepContextProvider>
            ))}
        </Box>
    );
});
