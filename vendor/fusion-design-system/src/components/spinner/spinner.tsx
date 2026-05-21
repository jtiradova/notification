import { cva } from "cva";
import type { ComponentProps } from "react";
import React from "react";
import "./spinner.scss";
import { Span } from "@singlestore/fusion/components/typography";

export const spinner = cva({ base: "sui-c-spinner" });

type SpinnerProps = Omit<ComponentProps<typeof Span>, "children">;

export const Spinner = React.forwardRef<React.ElementRef<"span">, SpinnerProps>(
    (props, forwardedRef) => {
        const { className, ...rest } = props;

        return (
            <Span
                ref={forwardedRef}
                className={spinner({ class: className })}
                {...rest}
            />
        );
    }
);
