import * as RadixSlot from "@radix-ui/react-slot";
import {
    textVariants,
    textVariantPropsKeys,
} from "@singlestore/fusion/components/typography/text";
import { split } from "@singlestore/fusion/utils/object";
import type { PolymorphicAsChildProp } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cva } from "cva";
import * as React from "react";
import "./code.scss";

export const code = cva({
    base: "sui-c-code",
    variants: {
        ...textVariants,
        appearance: {
            ghost: null,
            surface: "sui-c-code--appearance-surface",
        },
    },
});

export const Code = React.forwardRef<
    React.ElementRef<"code">,
    React.ComponentPropsWithoutRef<"code"> &
        VariantProps<typeof code> &
        PolymorphicAsChildProp
>(({ className, asChild, appearance, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "code";

    return (
        <Comp
            ref={forwardedRef}
            className={code({
                class: className,
                appearance,
                ...variantProps,
            })}
            {...elementProps}
        />
    );
});
