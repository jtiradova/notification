import { Span } from "@singlestore/fusion/components/typography";
import React from "react";

export const VisuallyHidden = React.forwardRef<
    React.ElementRef<typeof Span>,
    Omit<React.ComponentProps<typeof Span>, "visuallyHidden">
>((props, forwardedRef) => {
    return <Span ref={forwardedRef} visuallyHidden {...props} />;
});
