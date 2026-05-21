import classnames from "classnames";
import * as React from "react";

import "./header.scss";

export type HeaderProps = {
    className?: string;

    sticky?: boolean;

    left?: React.ReactNode;
    right?: React.ReactNode;
    middle?: React.ReactNode;
};

/**
 * A header component that can be used to display a header with left, middle and right content.
 */
export function Header({
    left,
    right,
    middle,
    className,
    sticky,
}: HeaderProps) {
    const classes = classnames(className, "single-common-components-header", {
        sticky,
    });

    return (
        <div className={classes}>
            <div className="left">{left}</div>

            <div className="middle">{middle}</div>

            <div className="right">{right}</div>
        </div>
    );
}
