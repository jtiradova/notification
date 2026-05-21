import * as RadixSlot from "@radix-ui/react-slot";
import { split } from "@singlestore/fusion/utils/object";
import type { PolymorphicAsChildProp } from "@singlestore/fusion/utils/types";
import type { VariantProps } from "cva";
import { cva, cx } from "cva";
import * as React from "react";
import { faLink } from "@fortawesome/sharp-solid-svg-icons";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { boxVariants } from "@singlestore/fusion/components/layout";
import {
    text,
    textVariantPropsKeys,
} from "@singlestore/fusion/components/typography/text";
import { createContext } from "@singlestore/fusion/react-utils/context";
import "./heading.scss";

// https://webaim.org/techniques/semanticstructure/#headings

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingElementRef = React.ElementRef<HeadingElement>;

type HeadingProps = React.ComponentPropsWithoutRef<HeadingElement> &
    VariantProps<typeof heading> &
    PolymorphicAsChildProp;

export const heading: typeof text = (props) => {
    return cx("sui-c-heading", text({ variant: "heading-1", ...props }));
};

const Heading = React.forwardRef<
    HeadingElementRef,
    HeadingProps & { as: HeadingElement | typeof RadixSlot.Slot }
>((props, forwardedRef) => {
    const { className, as: Comp, ...rest } = props;
    const [variantProps, elementProps] = split(rest, textVariantPropsKeys);

    return (
        <Comp
            ref={forwardedRef}
            className={heading({ ...variantProps, class: className })}
            {...elementProps}
        />
    );
});

const headingAnchorVariants = {
    ...boxVariants,
};

export const headingAnchorVariantPropsKeys = Object.keys(
    headingAnchorVariants
) as Array<keyof typeof headingAnchorVariants>;

export const headingAnchor = cva({
    base: "sui-c-heading__anchor",
    variants: headingAnchorVariants,
});

export const HeadingAnchor = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> &
        VariantProps<typeof headingAnchor> & {
            strict?: boolean;
        }
>((props, forwardedRef) => {
    const { id: headingId } = useHeadingContext();
    const {
        className,
        children = <FaIcon icon={faLink} />,
        href = headingId ? `#${headingId}` : undefined,
        strict = true,
        ...rest
    } = props;

    const [variantProps, elementProps] = split(
        rest,
        headingAnchorVariantPropsKeys
    );

    if (!href) {
        if (strict) {
            throw new Error(
                "HeadingAnchor: `id` prop is required on heading when `href` is not provided"
            );
        }
        return null;
    }

    return (
        <a
            ref={forwardedRef}
            className={headingAnchor({ ...variantProps, class: className })}
            href={href}
            {...elementProps}
        >
            {children}
        </a>
    );
});

const [HeadingContextProvider, useHeadingContext] = createContext<{
    id?: string;
}>({});

export { useHeadingContext };

export const H1 = React.forwardRef<HeadingElementRef, HeadingProps>(
    (props, forwardedRef) => {
        const { asChild, id, ...rest } = props;
        const Comp = asChild ? RadixSlot.Slot : "h1";

        return (
            <HeadingContextProvider value={{ id }}>
                <Heading id={id} as={Comp} ref={forwardedRef} {...rest} />
            </HeadingContextProvider>
        );
    }
);

export const H2 = React.forwardRef<HeadingElementRef, HeadingProps>(
    (props, forwardedRef) => {
        const { asChild, id, ...rest } = props;
        const Comp = asChild ? RadixSlot.Slot : "h2";

        return (
            <HeadingContextProvider value={{ id }}>
                <Heading id={id} as={Comp} ref={forwardedRef} {...rest} />
            </HeadingContextProvider>
        );
    }
);

export const H3 = React.forwardRef<HeadingElementRef, HeadingProps>(
    (props, forwardedRef) => {
        const { asChild, id, ...rest } = props;
        const Comp = asChild ? RadixSlot.Slot : "h3";

        return (
            <HeadingContextProvider value={{ id }}>
                <Heading id={id} as={Comp} ref={forwardedRef} {...rest} />
            </HeadingContextProvider>
        );
    }
);

export const H4 = React.forwardRef<HeadingElementRef, HeadingProps>(
    (props, forwardedRef) => {
        const { asChild, id, ...rest } = props;
        const Comp = asChild ? RadixSlot.Slot : "h4";

        return (
            <HeadingContextProvider value={{ id }}>
                <Heading id={id} as={Comp} ref={forwardedRef} {...rest} />
            </HeadingContextProvider>
        );
    }
);

export const H5 = React.forwardRef<HeadingElementRef, HeadingProps>(
    (props, forwardedRef) => {
        const { asChild, id, ...rest } = props;
        const Comp = asChild ? RadixSlot.Slot : "h5";

        return (
            <HeadingContextProvider value={{ id }}>
                <Heading id={id} as={Comp} ref={forwardedRef} {...rest} />
            </HeadingContextProvider>
        );
    }
);

export const H6 = React.forwardRef<HeadingElementRef, HeadingProps>(
    (props, forwardedRef) => {
        const { asChild, id, ...rest } = props;
        const Comp = asChild ? RadixSlot.Slot : "h6";

        return (
            <HeadingContextProvider value={{ id }}>
                <Heading id={id} as={Comp} ref={forwardedRef} {...rest} />
            </HeadingContextProvider>
        );
    }
);
