import React from "react";

import type { boxVariants } from "@singlestore/fusion/components/layout";
import {
    box,
    boxVariantPropsKeys,
} from "@singlestore/fusion/components/layout";
import { split } from "@singlestore/fusion/utils/object";
import type { ThemeConditionalValue } from "@singlestore/fusion/theme-context";
import { useResolveSrc } from "@singlestore/fusion/react-utils/use-resolve-src";
import type { VariantProps } from "cva";
import { cx } from "cva";

type ImageProps = Omit<VariantProps<typeof box>, "width" | "height"> &
    Omit<React.ComponentProps<"img">, "src"> & {
        src: string | ThemeConditionalValue<string>;
    };

export const Image = React.forwardRef<React.ElementRef<"img">, ImageProps>(
    (props, ref) => {
        const resolveSrc = useResolveSrc();

        // we want to be able to set the pixel value of the width and height
        // directly on the element, instead of using the fusion helpers
        type FilteredBoxProps = Exclude<
            keyof typeof boxVariants,
            "width" | "height"
        >;

        const filteredBoxVariants = boxVariantPropsKeys.filter(
            (key) => key !== "width" && key !== "height"
        ) as Array<FilteredBoxProps>;

        const [boxVariantProps, imgProps] = split(props, filteredBoxVariants);

        const { src: srcProp, className: classNameProp, ...rest } = imgProps;
        const src = resolveSrc(srcProp);

        return (
            <img
                ref={ref}
                src={src}
                className={cx(
                    "sui-c-image",
                    box({ ...boxVariantProps }),
                    classNameProp
                )}
                {...rest}
            />
        );
    }
);
