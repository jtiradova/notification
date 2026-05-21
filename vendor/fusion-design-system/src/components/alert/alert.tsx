import React from "react";
import type { VariantProps } from "cva";
import { cva, cx } from "cva";
import { faTimes as falTimes } from "@fortawesome/sharp-light-svg-icons";
import type { IconDefinition } from "@fortawesome/sharp-regular-svg-icons";
import {
    faCheckCircle as farCheckCircle,
    faExclamationCircle as farExclamationCircle,
    faExclamationTriangle as farExclamationTriangle,
    faInfoCircle as farInfoCircle,
} from "@fortawesome/sharp-regular-svg-icons";
import type {
    IconButtonPropsWithIconProp,
    Button,
} from "@singlestore/fusion/components/button";
import { IconButton } from "@singlestore/fusion/components/button";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { Spinner } from "@singlestore/fusion/components/spinner/spinner";
import { Box } from "@singlestore/fusion/components/layout";
import { Paragraph } from "@singlestore/fusion/components/typography";
import { createContext } from "@singlestore/fusion/react-utils/context";
import { callAllHandlers } from "@singlestore/fusion/utils/function";
import type { Optional } from "@singlestore/fusion/utils/types";
import { isUndefined } from "@singlestore/fusion/utils/assertion";

import "./alert.scss";

export const alertVariants = {
    variant: {
        positive: "sui-c-alert--variant-positive",
        warning: "sui-c-alert--variant-warning",
        critical: "sui-c-alert--variant-critical",
        info: "sui-c-alert--variant-info",
    },
    squareCorners: {
        true: "sui-c-alert--square-corners",
    },
    loading: {
        true: "sui-c-alert--loading",
    },
};

export const alert = cva({
    base: "sui-c-alert",
    variants: alertVariants,
    defaultVariants: {
        variant: "info",
    },
});

type AlertContext = {
    onClose?: () => void;
    variant: NonNullable<VariantProps<typeof alert>["variant"]>;
    loading?: boolean;
};

const [AlertContextProvider, useAlertContext] = createContext<AlertContext>({});

const ALERT_ICON: {
    [variant in NonNullable<AlertProps["variant"]>]: IconDefinition;
} = {
    positive: farCheckCircle,
    warning: farExclamationCircle,
    critical: farExclamationTriangle,
    info: farInfoCircle,
};

type AlertProps = Omit<AlertRootProps, "children"> & {
    title?: React.ReactNode;
    description: React.ReactNode;
    icon?: Nullable<IconDefinition>;
};

/**
 * Used to display an alert message to the user.
 *
 * The alert can have a title, description, and variant. The variant determines the color of the alert and the icon displayed.
 */
export const Alert = React.forwardRef<React.ElementRef<typeof Box>, AlertProps>(
    (props, forwardedRef) => {
        const {
            variant = "info",
            className,
            loading,
            squareCorners,
            title,
            description,
            icon,
            onClose,
            ...rest
        } = props;

        return (
            <AlertRoot
                ref={forwardedRef}
                className={className}
                variant={variant}
                loading={loading}
                squareCorners={squareCorners}
                onClose={onClose}
                {...rest}
            >
                {icon !== null && <AlertIcon icon={icon} />}
                <AlertBody>
                    {!isUndefined(title) && <AlertTitle>{title}</AlertTitle>}
                    <AlertDescription>{description}</AlertDescription>
                </AlertBody>
                {!isUndefined(onClose) && <AlertClose />}
            </AlertRoot>
        );
    }
);

type AlertRootProps = React.ComponentProps<typeof Box> & {
    onClose?: () => void;
} & VariantProps<typeof alert>;

/**
 * Passes context to the Alert's children.
 */
export const AlertRoot = React.forwardRef<
    React.ElementRef<typeof Box>,
    AlertRootProps
>((props, forwardedRef) => {
    const {
        variant = "info",
        className,
        loading,
        squareCorners,
        children,
        onClose,
        ...rest
    } = props;

    return (
        <AlertContextProvider value={{ variant, loading, onClose }}>
            <Box
                ref={forwardedRef}
                className={alert({
                    class: className,
                    variant,
                    squareCorners,
                })}
                {...rest}
            >
                {children}
            </Box>
        </AlertContextProvider>
    );
});

export const AlertIcon = React.forwardRef<
    React.ElementRef<typeof FaIcon>,
    Optional<React.ComponentProps<typeof FaIcon>, "icon">
>((props, forwardedRef) => {
    const { variant, loading } = useAlertContext();
    const { className, icon = ALERT_ICON[variant], ...rest } = props;

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="sui-c-alert__icon-wrapper">
            <FaIcon
                ref={forwardedRef}
                className={cx("sui-c-alert__icon", className)}
                icon={icon}
                {...rest}
            />
        </div>
    );
});

export const AlertClose = React.forwardRef<
    React.ElementRef<typeof Button>,
    Optional<IconButtonPropsWithIconProp, "aria-label" | "icon">
>((props, forwardedRef) => {
    const { onClose } = useAlertContext();
    const { className, icon = falTimes, variant = "unstyled", ...rest } = props;

    return (
        <IconButton
            ref={forwardedRef}
            className={cx("sui-c-alert__close-button", className)}
            variant={variant}
            aria-label="Close"
            icon={icon}
            onClick={callAllHandlers(props.onClick, onClose)}
            {...rest}
        />
    );
});

export const AlertBody = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardedRef}
            className={cx("sui-c-alert__body", className)}
            {...rest}
        />
    );
});

export const AlertTitle = React.forwardRef<
    React.ElementRef<typeof Paragraph>,
    React.ComponentProps<typeof Paragraph>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Paragraph
            ref={forwardedRef}
            className={cx("sui-c-alert__title", className)}
            variant="heading-1"
            {...rest}
        />
    );
});

export const AlertDescription = React.forwardRef<
    React.ElementRef<typeof Paragraph | typeof Box>,
    React.ComponentProps<typeof Paragraph | typeof Box>
>((props, forwardedRef) => {
    const { className, children, ...rest } = props;

    const commonProps = {
        ref: forwardedRef,
        className: cx("sui-c-alert__description", className),
        ...rest,
    };

    if (typeof children === "string") {
        return <Paragraph {...commonProps}>{children}</Paragraph>;
    }

    return <Box {...commonProps}>{children}</Box>;
});
