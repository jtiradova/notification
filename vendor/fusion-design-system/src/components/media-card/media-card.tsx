import * as RadixSlot from "@radix-ui/react-slot";
import { Card } from "@singlestore/fusion/components/card";
import {
    box,
    Box,
    boxVariantPropsKeys,
} from "@singlestore/fusion/components/layout";
import { Badge, BadgeGroup } from "@singlestore/fusion/components/badge";
import { H2, Paragraph } from "@singlestore/fusion/components/typography";
import { split } from "@singlestore/fusion/utils/object";
import type { PolymorphicAsChildProp } from "@singlestore/fusion/utils/types";
import { isString } from "@singlestore/fusion/utils/assertion";
import type { VariantProps } from "cva";
import { cva, cx } from "cva";
import React from "react";

import "./media-card.scss";
import { Avatar } from "@singlestore/fusion/components/avatar";

export const MediaCard = React.forwardRef<
    React.ElementRef<typeof Card>,
    React.ComponentProps<typeof Card>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Card
            ref={forwardedRef}
            className={cx("sui-c-media-card", className)}
            {...rest}
        />
    );
});

export const mediaCardHeaderVariants = {
    variant: {
        neutral: "sui-c-media-card__header--variant-neutral",
        brand: "sui-c-media-card__header--variant-brand",
        unstyled: null,
    },
};

const mediaCardHeader = cva({
    base: "sui-c-media-card__header",
    variants: mediaCardHeaderVariants,
    defaultVariants: {
        variant: "unstyled",
    },
});

export const MediaCardHeader = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box> & VariantProps<typeof mediaCardHeader>
>((props, forwardedRef) => {
    const { className, variant = "unstyled", ...rest } = props;

    const darkVariants = ["neutral", "brand"];
    let themeClassName;
    if (darkVariants.includes(variant)) {
        themeClassName = "dark-mode";
    }

    const classes = mediaCardHeader({
        variant,
        class: cx(className, themeClassName),
    });

    return <Box ref={forwardedRef} className={classes} {...rest} />;
});

type MediaCardIconProps = {
    icon: string | React.ReactNode;
};

export const MediaCardIcon = React.forwardRef<
    React.ElementRef<"img">,
    React.ComponentProps<"img"> &
        VariantProps<typeof mediaCardHeader> &
        MediaCardIconProps
>((props, forwardedRef) => {
    const { className, icon, width, height = 48, ...rest } = props;

    let iconToRender: React.ReactNode = icon;
    if (isString(icon)) {
        iconToRender = (
            <img
                ref={forwardedRef}
                className="sui-c-media-card__icon__image"
                src={icon}
                width={width}
                height={height}
                {...rest}
            />
        );
    }

    return (
        <div className={cx("sui-c-media-card__icon", className)}>
            {iconToRender}
        </div>
    );
});

type MediaCardIconHeaderProps = React.ComponentProps<typeof MediaCardHeader> &
    Omit<React.ComponentProps<typeof MediaCardIcon>, "icon"> & {
        icon: string | React.ReactNode;
    };

export const MediaCardIconHeader = React.forwardRef<
    React.ElementRef<typeof MediaCardHeader>,
    MediaCardIconHeaderProps
>((props, forwardedRef) => {
    const { variant, icon, children, width, height, ...rest } = props;

    return (
        <MediaCardHeader ref={forwardedRef} variant={variant} {...rest}>
            <MediaCardIcon icon={icon} />
            {children}
        </MediaCardHeader>
    );
});

export const MediaCardBody = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardedRef}
            className={cx("sui-c-media-card__body", className)}
            {...rest}
        />
    );
});

export const MediaCardTitle = React.forwardRef<
    React.ElementRef<typeof H2>,
    React.ComponentProps<typeof H2>
>((props, forwardedRef) => {
    const { className, asChild, ...rest } = props;

    return (
        <H2
            ref={forwardedRef}
            variant="heading-4"
            className={cx("sui-c-media-card__title", className)}
            {...rest}
        />
    );
});

export const MediaCardEyebrow = React.forwardRef<
    React.ElementRef<typeof Paragraph>,
    React.ComponentProps<typeof Paragraph>
>((props, forwardedRef) => {
    const { className, asChild, ...rest } = props;

    return (
        <Paragraph
            ref={forwardedRef}
            className={cx("sui-c-media-card__eyebrow", className)}
            {...rest}
        />
    );
});

export const MediaCardDescription = React.forwardRef<
    React.ElementRef<typeof Paragraph>,
    React.ComponentProps<typeof Paragraph>
>((props, forwardedRef) => {
    const { className, asChild, ...rest } = props;

    return (
        <Paragraph
            ref={forwardedRef}
            className={cx("sui-c-media-card__description", className)}
            {...rest}
        />
    );
});

export const MediaCardHeaderBadge = React.forwardRef<
    React.ElementRef<typeof Badge>,
    React.ComponentProps<typeof Badge>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    // Header badges are always rendered in light mode
    return (
        <Badge
            ref={forwardedRef}
            className={cx(
                "sui-c-media-card__header-badge",
                "light-mode",
                className
            )}
            {...rest}
        />
    );
});

export const MediaCardBadgeGroup = React.forwardRef<
    React.ElementRef<typeof BadgeGroup>,
    React.ComponentProps<typeof BadgeGroup>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <BadgeGroup
            ref={forwardedRef}
            className={cx("sui-c-media-card__badge-group", className)}
            {...rest}
        />
    );
});

export const MediaCardBadge = React.forwardRef<
    React.ElementRef<typeof Badge>,
    React.ComponentProps<typeof Badge>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Badge
            ref={forwardedRef}
            className={cx("sui-c-media-card__badge", className)}
            {...rest}
        />
    );
});

export const MediaCardAuthor = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardedRef}
            className={cx("sui-c-media-card__author", className)}
            {...rest}
        />
    );
});

export const MediaCardAuthorAvatar = React.forwardRef<
    React.ElementRef<typeof Avatar>,
    React.ComponentProps<typeof Avatar>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Avatar
            size="2"
            radius="circle"
            ref={forwardedRef}
            className={cx("sui-c-media-card__author__avatar", className)}
            {...rest}
        />
    );
});

export const MediaCardAuthorInfo = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardedRef}
            className={cx("sui-c-media-card__author__info", className)}
            {...rest}
        />
    );
});

export const MediaCardAuthorName = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardedRef}
            className={cx("sui-c-media-card__author__info__name", className)}
            {...rest}
        />
    );
});

export const MediaCardAuthorDescription = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardedRef}
            className={cx(
                "sui-c-media-card__author__info__description",
                className
            )}
            {...rest}
        />
    );
});

export const MediaCardFooter = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
        <Box
            ref={forwardedRef}
            className={cx("sui-c-media-card__footer", className)}
            {...rest}
        />
    );
});

type MediaCardLinkProps = React.ComponentPropsWithoutRef<"a"> &
    VariantProps<typeof box> &
    PolymorphicAsChildProp;

export const MediaCardLink = React.forwardRef<
    React.ElementRef<"a">,
    MediaCardLinkProps
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, boxVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "a";

    return (
        <Comp
            ref={forwardedRef}
            className={cx(
                "sui-c-media-card__link",
                className,
                box({
                    ...variantProps,
                })
            )}
            {...elementProps}
        />
    );
});
