import React from "react";

export type UseStepsProps = {
    defaultIndex?: number;
    count?: number;
};

export type StepStatus = "complete" | "current" | "incomplete";

export function useSteps(props: UseStepsProps = {}) {
    const { defaultIndex = 0, count } = props;
    const [index, setIndex] = React.useState(defaultIndex);

    return {
        index,
        setIndex,
        progressPercentage:
            typeof count === "number"
                ? ((index / count) * 100).toFixed(0)
                : undefined,
        isCurrentStep(step: number) {
            return step === index;
        },
        isCompleteStep(step: number) {
            return step < index;
        },
        isIncompleteStep(step: number) {
            return step > index;
        },
        isAtFirst: index === 0,
        isAtLast: typeof count === "number" ? index === count - 1 : false,
        isComplete: typeof count === "number" ? index === count : false,
        getStatus(step: number): StepStatus {
            if (step < index) return "complete";
            if (step > index) return "incomplete";
            return "current";
        },
        goToNext() {
            setIndex((step) => {
                return typeof count === "number"
                    ? Math.min(count, step + 1)
                    : step + 1;
            });
        },
        goToPrevious() {
            setIndex((step) => Math.max(0, step - 1));
        },
    };
}

export type UseStepsReturn = ReturnType<typeof useSteps>;
