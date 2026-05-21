export type Booleanish = boolean | "true" | "false";

export type Maybe<T> = NonNullable<T> | undefined;

export type Nullable<T> = T | null;

export type Dict<T = any> = Record<string, T>;

// Turns the specified keys into optional keys
export type Optional<Object, Keys extends keyof Object = keyof Object> = Omit<
    Object,
    Keys
> &
    Partial<Pick<Object, Keys>>;

// Turns the specified keys into required keys
export type RequiredKeys<
    Object,
    Keys extends keyof Object = keyof Object,
> = Omit<Object, Keys> & Required<Pick<Object, Keys>>;

// Used to give `asChild` prop to components that render Radix' `Slot` component for polymorphism
export type PolymorphicAsChildProp = { asChild?: boolean };

// Removes the Optional Keys from the object
// e.g. RequiredFieldsOnly<{name: string, age?: number}> => {name: string}
export type RequiredFieldsOnly<T extends object> = {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type FunctionArguments<T extends Function> = T extends (
    ...args: infer R
) => any
    ? R
    : never;
