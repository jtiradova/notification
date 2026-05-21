import type { Responsive, Union } from "@singlestore/fusion/props";
import { breakpoints } from "@singlestore/fusion/props";
import { hasOwnProperty } from "./has-own-property";
import { isResponsiveObject } from "./is-responsive-object";

interface GetResponsiveStylesOptions {
    className: string;
    customProperties: Array<`--${string}`>;
    value: Maybe<Responsive<Union> | Responsive<string>>;
    propValues: Array<string> | ReadonlyArray<string>;
    parseValue?: (value: string) => Maybe<string>;
}

function getResponsiveStyles({
    className,
    customProperties,
    ...args
}: GetResponsiveStylesOptions) {
    const responsiveClassNames = getResponsiveClassNames({
        allowArbitraryValues: true,
        className,
        ...args,
    });

    const responsiveCustomProperties = getResponsiveCustomProperties({
        customProperties,
        ...args,
    });
    return [responsiveClassNames, responsiveCustomProperties] as const;
}

interface GetResponsiveClassNamesOptions {
    allowArbitraryValues?: boolean;
    className: string;
    value: Maybe<Responsive<Union> | Responsive<string>>;
    propValues: Array<string> | ReadonlyArray<string>;
    parseValue?: (value: string) => Maybe<string>;
}

function getResponsiveClassNames({
    allowArbitraryValues,
    value,
    className,
    propValues,
    parseValue = (value) => value,
}: GetResponsiveClassNamesOptions): Maybe<string> {
    const classNames: Array<string> = [];

    if (!value) {
        return undefined;
    }

    if (typeof value === "string" && propValues.includes(value)) {
        return getBaseClassName(className, value, parseValue);
    }

    if (isResponsiveObject(value)) {
        const object = value;

        for (const bp in object) {
            // Make sure we are not iterating over keys that aren't breakpoints
            if (!hasOwnProperty(object, bp) || !breakpoints.includes(bp)) {
                continue;
            }

            const value = object[bp];

            if (value !== undefined) {
                if (propValues.includes(value)) {
                    const baseClassName = getBaseClassName(
                        className,
                        value,
                        parseValue
                    );
                    const bpClassName =
                        bp === "initial"
                            ? baseClassName
                            : `${bp}:${baseClassName}`;
                    classNames.push(bpClassName);
                } else if (allowArbitraryValues) {
                    const bpClassName =
                        bp === "initial" ? className : `${bp}:${className}`;
                    classNames.push(bpClassName);
                }
            }
        }

        return classNames.join(" ");
    }

    if (allowArbitraryValues) {
        return className;
    }
}

function getBaseClassName(
    className: string,
    value: string,
    parseValue: (value: string) => Maybe<string>
): string {
    const delimiter = className ? "-" : "";
    const matchedValue = parseValue(value);
    const isNegative = matchedValue?.startsWith("-");
    const minus = isNegative ? "-" : "";
    const absoluteValue = isNegative
        ? matchedValue?.substring(1)
        : matchedValue;
    return `${minus}${className}${delimiter}${absoluteValue}`;
}

interface GetResponsiveCustomPropertiesOptions {
    customProperties: Array<`--${string}`>;
    value: Maybe<Responsive<Union> | Responsive<string>>;
    propValues: Array<string> | ReadonlyArray<string>;
    parseValue?: (value: string) => Maybe<string>;
}

function getResponsiveCustomProperties({
    customProperties,
    value,
    propValues,
    parseValue = (value) => value,
}: GetResponsiveCustomPropertiesOptions) {
    let styles: Record<string, Maybe<string>> = {};

    // Don't generate custom properties if the value is not arbitrary
    if (!value || (typeof value === "string" && propValues.includes(value))) {
        return undefined;
    }

    if (typeof value === "string") {
        styles = Object.fromEntries(
            customProperties.map((prop) => [prop, value])
        );
    }

    if (isResponsiveObject(value)) {
        const object = value;

        for (const bp in object) {
            // Make sure we are not iterating over keys that aren't breakpoints
            if (!hasOwnProperty(object, bp) || !breakpoints.includes(bp)) {
                continue;
            }

            const value = object[bp];

            // Don't generate a custom property if the value is not arbitrary
            if (propValues.includes(value)) {
                continue;
            }

            for (const customProperty of customProperties) {
                const bpProperty =
                    bp === "initial"
                        ? customProperty
                        : `${customProperty}-${bp}`;

                styles = {
                    [bpProperty]: value,
                    ...styles,
                };
            }
        }
    }

    for (const key in styles) {
        const value = styles[key];
        if (value !== undefined) {
            styles[key] = parseValue(value);
        }
    }

    return styles;
}

export {
    getResponsiveStyles,
    getResponsiveCustomProperties,
    getResponsiveClassNames,
};
