import { Box } from "@singlestore/fusion/components/layout";
import { isEmptyArray } from "@singlestore/fusion/utils/assertion";
import { cx } from "cva";
import React from "react";

import "./multi-select-group.scss";

/**
 * Groups multiple MultiSelect components together for consistent spacing
 * e.g., multiple filters in a toolbar.
 */
export const MultiSelectGroup = React.forwardRef<
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
            className={cx("sui-c-multi-select-group", className)}
            {...rest}
        />
    );
});
