import type React from "react";

export type ComponentPropsAs<
    C extends React.ElementType<any>,
    T extends React.ComponentPropsWithoutRef<C>["as"],
> = Omit<
    Extract<React.ComponentPropsWithoutRef<C>, { as: T }>,
    "as" | "asChild"
>;

// Omits the specified props from the component props. Autocomplete will suggest props
// of the component, but won't restrict the omittable props to those that actually exist.
export type ComponentPropsWithout<
    T extends React.ElementType,
    O extends
        | Omit<string, keyof React.ComponentPropsWithoutRef<T>>
        | keyof React.ComponentPropsWithoutRef<T>,
> = Omit<React.ComponentPropsWithoutRef<T>, O & string>;

export type RemovedProps =
    | "asChild"
    | "defaultChecked"
    | "defaultValue"
    | "color";
