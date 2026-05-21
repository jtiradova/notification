import * as React from "react";
import classNames from "classnames";

import { flexPropDefs } from "./flex.props.js";

import type { FlexOwnProps } from "./flex.props.js";
import type {
    ComponentPropsWithout,
    RemovedProps,
} from "@singlestore/fusion/helpers/component-props.js";
import { extractProps } from "@singlestore/fusion/helpers/extract-props.js";
import type { LayoutProps } from "@singlestore/fusion/props/layout.props.js";
import { layoutPropDefs } from "@singlestore/fusion/props/layout.props.js";
import type { MarginProps } from "@singlestore/fusion/props/margin.props.js";
import { marginPropDefs } from "@singlestore/fusion/props/margin.props.js";
import { Slot } from "@radix-ui/react-slot";

type FlexElement = React.ElementRef<"div">;
interface CommonFlexProps extends MarginProps, LayoutProps, FlexOwnProps {}
type FlexDivProps = { as?: "div" } & ComponentPropsWithout<"div", RemovedProps>;
type FlexSpanProps = { as: "span" } & ComponentPropsWithout<
    "span",
    RemovedProps
>;
type FlexProps = CommonFlexProps & (FlexSpanProps | FlexDivProps);

const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
    const {
        className,
        asChild,
        as: Tag = "div",
        ...flexProps
    } = extractProps(props, flexPropDefs, layoutPropDefs, marginPropDefs);
    const Comp = asChild ? Slot : Tag;
    return (
        <Comp
            {...flexProps}
            ref={forwardedRef}
            className={classNames("sui-Flex", className)}
        />
    );
});
Flex.displayName = "Flex";

export { Flex };
export type { FlexProps };
