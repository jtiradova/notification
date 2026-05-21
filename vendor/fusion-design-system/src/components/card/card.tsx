import { Box } from "@singlestore/fusion/components/layout";
import type { VariantProps } from "cva";
import { cva } from "cva";
import { split } from "@singlestore/fusion/utils/object";
import * as React from "react";

import "./card.scss";

type CardProps = React.ComponentPropsWithoutRef<typeof Box> &
    VariantProps<typeof card>;

export const cardVariants = {
    interactive: {
        true: "sui-c-card--interactive",
    },
    disableMotion: {
        true: "sui-c-card--disable-motion",
    },
};

export const card = cva({ base: "sui-c-card", variants: cardVariants });

export const cardVariantPropsKeys = Object.keys(cardVariants) as Array<
    keyof typeof cardVariants
>;

/**
 * Container that groups related content and actions
 */
export const Card = React.forwardRef<React.ElementRef<typeof Box>, CardProps>(
    (props, ref) => {
        const { className, ...rest } = props;
        const [cardVariantProps, boxProps] = split(rest, cardVariantPropsKeys);

        return (
            <Box
                ref={ref}
                className={card({
                    ...cardVariantProps,
                    class: className,
                })}
                {...boxProps}
            />
        );
    }
);
