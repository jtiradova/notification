import * as RadixSlot from "@radix-ui/react-slot";
import {
    text,
    textVariantPropsKeys,
} from "@singlestore/fusion/components/typography/text";
import { split } from "@singlestore/fusion/utils/object";
import type { PolymorphicAsChildProp } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cx } from "cva";
import * as React from "react";

import "./paragraph.scss";

export const paragraph: typeof text = (props) => {
    return cx("sui-c-paragraph", text({ variant: "body-2", ...props }));
};

export const Paragraph = React.forwardRef<
    React.ElementRef<"p">,
    React.ComponentPropsWithoutRef<"p"> &
        VariantProps<typeof paragraph> &
        PolymorphicAsChildProp
>(({ className, asChild, ...rest }, forwardedRef) => {
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);
    const Comp = asChild ? RadixSlot.Slot : "p";

    return (
        <Comp
            ref={forwardedRef}
            className={paragraph({
                ...variantProps,
                class: className,
            })}
            {...elementProps}
        />
    );
});
