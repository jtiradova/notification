import { faCheck } from "@fortawesome/sharp-solid-svg-icons";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { Box } from "@singlestore/fusion/components/layout";
import type {
    StepContext,
    StepStatusType,
} from "@singlestore/fusion/components/stepper/step-context";
import {
    step,
    stepIndicator,
    useStepContext,
} from "@singlestore/fusion/components/stepper/step-context";
import { H3 } from "@singlestore/fusion/components/typography";
import { dataAttr } from "@singlestore/fusion/utils/dom";
import { runIfFn } from "@singlestore/fusion/utils/function";
import type { Optional } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cx } from "cva";
import React from "react";

export type StepProps = React.ComponentProps<typeof Box> &
    VariantProps<typeof step> & {
        /**
         * Whether the step is clickable
         * @default false
         * @type boolean
         */
        clickable?: boolean;
    };

export const Step = React.forwardRef<React.ElementRef<typeof Box>, StepProps>(
    (props, forwardedRef) => {
        const { className, clickable, ...rest } = props;
        const { orientation, status, variant } = useStepContext();

        return (
            <Box
                ref={forwardedRef}
                className={step({ variant, class: className })}
                data-status={status}
                data-orientation={orientation}
                data-clickable={dataAttr(clickable)}
                {...rest}
            />
        );
    }
);

export const StepTitle = React.forwardRef<
    React.ElementRef<typeof H3>,
    React.ComponentProps<typeof H3>
>((props, forwardedRef) => {
    const { className, ...rest } = props;
    const { status } = useStepContext();

    return (
        <H3
            ref={forwardedRef}
            data-status={status}
            className={cx("sui-c-stepper__title", className)}
            {...rest}
        />
    );
});

type StepIconProps = Optional<React.ComponentProps<typeof FaIcon>, "icon">;

export const StepIcon = React.forwardRef<
    React.ElementRef<typeof FaIcon>,
    StepIconProps
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    const { status } = useStepContext();

    const icon = status === "complete" ? faCheck : undefined;

    if (!icon) {
        return null;
    }

    return (
        <FaIcon
            ref={forwardedRef}
            icon={icon}
            className={cx("sui-c-stepper__icon", className)}
            {...rest}
        />
    );
});

export const StepIndicator = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;
    const { status, variant } = useStepContext();

    return (
        <Box
            ref={forwardedRef}
            data-status={status}
            className={stepIndicator({ variant, class: className })}
            {...rest}
        />
    );
});

export function StepIndicatorContent() {
    return (
        <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            current={<StepNumber />}
        />
    );
}

export const StepNumber = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { children, className, ...rest } = props;
    const { status, index } = useStepContext();

    return (
        <Box
            ref={forwardedRef}
            data-status={status}
            className={cx("sui-c-stepper__number", className)}
            {...rest}
        >
            {children || index + 1}
        </Box>
    );
});

export const StepSeparator = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;
    const { orientation, status, isLast } = useStepContext();

    if (isLast) return null;

    return (
        <Box
            ref={forwardedRef}
            className={cx("sui-c-stepper__separator", className)}
            role="separator"
            data-orientation={orientation}
            data-status={status}
            {...rest}
        />
    );
});

type MaybeRenderProp =
    | React.ReactNode
    | ((props: StepContext) => React.ReactNode);

export type StepStatusProps = Partial<Record<StepStatusType, MaybeRenderProp>>;

export function StepStatus(props: StepStatusProps) {
    const { complete, incomplete, current } = props;
    const context = useStepContext();

    let render: Nullable<React.ReactNode> = null;

    switch (context.status) {
        case "complete":
            render = runIfFn(complete, context);
            break;
        case "incomplete":
            render = runIfFn(incomplete, context);
            break;
        case "current":
            render = runIfFn(current, context);
            break;
    }

    return render ? <>{render}</> : null;
}
