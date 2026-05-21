import * as React from "react";
import classNames from "classnames";

import { separatorPropDefs } from "./separator.props";
import { extractProps } from "@singlestore/fusion/helpers/extract-props";
import { marginPropDefs } from "@singlestore/fusion/props/margin.props";

import type { MarginProps } from "@singlestore/fusion/props/margin.props";
import type {
    ComponentPropsWithout,
    RemovedProps,
} from "@singlestore/fusion/helpers/component-props";
import type { GetPropDefTypes } from "@singlestore/fusion/props/prop-def";
import "./separator.scss";

type SeparatorElement = React.ElementRef<"span">;
type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;

export type SeparatorProps = ComponentPropsWithout<"span", RemovedProps> &
    MarginProps &
    SeparatorOwnProps;

export const Separator = React.forwardRef<SeparatorElement, SeparatorProps>(
    (props, forwardedRef) => {
        const { className, decorative, ...separatorProps } = extractProps(
            props,
            separatorPropDefs,
            marginPropDefs
        );
        return (
            <span
                role={decorative ? undefined : "separator"}
                {...separatorProps}
                ref={forwardedRef}
                className={classNames("sui-Separator", className)}
            />
        );
    }
);

Separator.displayName = "Separator";
