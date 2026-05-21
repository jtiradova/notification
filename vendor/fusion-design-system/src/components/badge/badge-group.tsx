import { Box } from "@singlestore/fusion/components/layout";
import { isEmptyArray } from "@singlestore/fusion/utils/assertion";
import { cx } from "cva";
import React from "react";
import "./badge-group.scss";

export const BadgeGroup = React.forwardRef<
    React.ElementRef<typeof Box>,
    React.ComponentProps<typeof Box>
>((props, forwardedRef) => {
    const { className, ...rest } = props;

    if (!props.children || isEmptyArray(props.children)) {
        return null;
    }

    return (
        <Box
            role="group"
            ref={forwardedRef}
            className={cx("sui-c-badge-group", className)}
            {...rest}
        />
    );
});
