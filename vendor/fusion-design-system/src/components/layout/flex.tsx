import { Box, box } from "@singlestore/fusion/components/layout/box";
import React from "react";

/**
 * Class builder for applying utility classes to an element's `className` prop. This is used internally by the `Flex` component.
 * @example
 *  <nav
 *    className={flex({
 *      p: "2x",
 *      alignItems: "center",
 *      class: "my-custom-element"
 *    })}
 *  >
 *   <p>Some content</p>
 *  </nav>
 *
 *  // will render
 *
 * <nav class="sui-u-flex sui-u-p-2x sui-u-align-items-center my-custom-element">
 *  <p>Some content</p>
 * </nav>
 */
export const flex: typeof box = (props) => {
    return box({ display: "flex", ...props });
};

/**
 * Class builder for applying utility classes to an element's `className` prop. This is used internally by the `InlineFlex` component.
 * @example
 *  <nav
 *      className={inlineFlex({
 *          p: "2x",
 *          alignItems: "center",
 *          class: "my-custom-element"
 *      })}
 *  >
 *      <p>Some content</p>
 *  </nav>
 *
 * // will render
 *
 *  <nav class="sui-u-inline-flex sui-u-p-2x sui-u-align-items-center my-custom-element">
 *      <p>Some content</p>
 *  </nav>
 * */
export const inlineFlex: typeof box = (props) => {
    return box({ display: "inline-flex", ...props });
};

type FlexProps = React.ComponentPropsWithoutRef<typeof Box>;

/**
 * Flex is a primitive layout component that renders a `<Box>` (<div>) with `display: flex` and accepts props that can be used to apply the
 * design system's available utility classes in an ergonomic and type-safe way.
 * @example
 *  <Flex p="2x" alignItems="center" className="my-custom-element">
 *      <p>Some content</p>
 *  </Flex>
 *
 * // will render
 *
 * <div class="sui-u-flex sui-u-p-2x sui-u-align-items-center my-custom-element">
 *      <p>Some content</p>
 * </div>
 *
 * It accepts an `asChild` prop which, when `true`, will render as it's direct child
 * instead of a div. This is useful when you want to use Flex utility props on an element other than a div.
 * @see
 * {@link https://www.radix-ui.com/docs/primitives/utilities/slot | Radix Slot}
 * @example
 * <Flex asChild p="2x" background="surface-raised-1">
 *  <nav>Some content</nav>
 * </Flex>
 *
 * // will render
 *
 * <nav class="sui-u-flex sui-u-p-2x sui-u-background-surface-raised-1">
 *  Some content
 * </nav>
 * */
export const Flex = React.forwardRef<React.ElementRef<typeof Box>, FlexProps>(
    (props, forwardedRef) => {
        const { display = "flex", ...rest } = props;

        return <Box ref={forwardedRef} display={display} {...rest} />;
    }
);

Flex.displayName = "Flex";

/**
 * InlineFlex is a primitive layout component that renders a `<Box>` (<div>) with `display: inline-flex` and accepts props that can be used to apply the
 * design system's available utility classes in an ergonomic and type-safe way.
 * @example
 *  <InlineFlex p="2x" alignItems="center" className="my-custom-element">
 *      <p>Some content</p>
 *  </InlineFlex>
 *
 * // will render
 *
 * <div class="sui-u-inline-flex sui-u-p-2x sui-u-align-items-center my-custom-element">
 *      <p>Some content</p>
 * </div>
 *
 * It accepts an `asChild` prop which, when `true`, will render as it's direct child
 * instead of a div. This is useful when you want to use InlineFlex utility props on an element other than a div.
 * @see
 * {@link https://www.radix-ui.com/docs/primitives/utilities/slot | Radix Slot}
 * @example
 * <InlineFlex asChild p="2x" background="surface-raised-1">
 *  <nav>Some content</nav>
 * </InlineFlex>
 *
 * // will render
 *
 * <nav class="sui-u-inline-flex sui-u-p-2x sui-u-background-surface-raised-1">
 *  Some content
 * </nav>
 * */
export const InlineFlex = React.forwardRef<
    React.ElementRef<typeof Box>,
    FlexProps
>((props, forwardedRef) => {
    const { display = "inline-flex", ...rest } = props;

    return <Box ref={forwardedRef} display={display} {...rest} />;
});

InlineFlex.displayName = "InlineFlex";
