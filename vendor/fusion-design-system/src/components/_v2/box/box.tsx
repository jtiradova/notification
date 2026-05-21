import * as React from "react";
import classNames from "classnames";

import { Slot } from "@radix-ui/react-slot";
import type { BoxOwnProps } from "./box.props";
import { boxPropDefs } from "./box.props";
import { extractProps } from "@singlestore/fusion/helpers/extract-props";

import type {
    ComponentPropsWithout,
    RemovedProps,
} from "@singlestore/fusion/helpers/component-props";
import type { LayoutProps, MarginProps } from "@singlestore/fusion/props";
import { layoutPropDefs, marginPropDefs } from "@singlestore/fusion/props";

type BoxElement = React.ElementRef<"div">;
interface CommonBoxProps extends MarginProps, LayoutProps, BoxOwnProps {}
type BoxDivProps = { as?: "div" } & ComponentPropsWithout<"div", RemovedProps>;
type BoxSpanProps = { as: "span" } & ComponentPropsWithout<
    "span",
    RemovedProps
>;
type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);

/**
 * Fundamental layout building block
 */
const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
    const {
        className,
        asChild,
        as: Tag = "div",
        ...boxProps
    } = extractProps(props, boxPropDefs, layoutPropDefs, marginPropDefs);

    const Comp = asChild ? Slot : Tag;

    return (
        <Comp
            {...boxProps}
            ref={forwardedRef}
            className={classNames("sui-Box", className)}
        />
    );
});
Box.displayName = "Box";

export { Box };
export type { BoxProps };
