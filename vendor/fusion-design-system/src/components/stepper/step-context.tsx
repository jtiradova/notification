import { createContext } from "@singlestore/fusion/react-utils/context";
import type { VariantProps } from "cva";
import { cva } from "cva";

export type StepStatusType = "current" | "complete" | "incomplete";

export type Orientation = "horizontal" | "vertical";

export type StepVariant = VariantProps<typeof step>["variant"];

export type StepContext = {
    /**
     * The status of the step
     * @type "current" | "complete" | "incomplete"
     */
    status: StepStatusType;
    /**
     * The total number of steps
     */
    count: number;
    /**
     * The index of the step
     */
    index: number;
    /**
     * The orientation of the stepper
     * @default horizontal
     * @type "horizontal" | "vertical"
     */
    orientation: Orientation;
    /**
     * Whether the step is the last step
     */
    isLast: boolean;
    /**
     * Whether the step is the first step
     */
    isFirst: boolean;
    /**
     * The style variant of the Step component
     * @default numbered
     * @type "numbered" | "subdued"
     */
    variant: VariantProps<typeof step>["variant"];
};

export const step = cva({
    base: "sui-c-stepper__step",
    variants: {
        variant: {
            subdued: "sui-c-stepper__step--variant-subdued",
            numbered: "sui-c-stepper__step--variant-numbered",
        },
    },
    defaultVariants: {
        variant: "numbered",
    },
});

export const stepIndicator = cva({
    base: "sui-c-stepper__indicator",
    variants: {
        variant: {
            subdued: "sui-c-stepper__indicator--variant-subdued",
            numbered: "sui-c-stepper__indicator--variant-numbered",
        },
    },
    defaultVariants: {
        variant: "numbered",
    },
});

export const [StepContextProvider, useStepContext] = createContext<StepContext>(
    { name: "StepContext" }
);
