import * as React from "react";
import classNames from "classnames";

import { gridPropDefs, type GridOwnProps } from "./grid.props";
import { Slot } from "@radix-ui/react-slot";
import type {
    ComponentPropsWithout,
    RemovedProps,
} from "@singlestore/fusion/helpers/component-props";
import { extractProps } from "@singlestore/fusion/helpers/extract-props";
import type { LayoutProps } from "@singlestore/fusion/props/layout.props";
import { layoutPropDefs } from "@singlestore/fusion/props/layout.props";
import type { MarginProps } from "@singlestore/fusion/props/margin.props";
import { marginPropDefs } from "@singlestore/fusion/props/margin.props";

type GridElement = React.ElementRef<"div">;
interface CommonGridProps extends MarginProps, LayoutProps, GridOwnProps {}
type GridDivProps = { as?: "div" } & ComponentPropsWithout<"div", RemovedProps>;
type GridSpanProps = { as: "span" } & ComponentPropsWithout<
    "span",
    RemovedProps
>;
type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);

const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
    const {
        className,
        asChild,
        as: Tag = "div",
        ...gridProps
    } = extractProps(props, gridPropDefs, layoutPropDefs, marginPropDefs);
    const Comp = asChild ? Slot : Tag;
    return (
        <Comp
            {...gridProps}
            ref={forwardedRef}
            className={classNames("sui-Grid", className)}
        />
    );
});
Grid.displayName = "Grid";

export { Grid };
export type { GridProps };
