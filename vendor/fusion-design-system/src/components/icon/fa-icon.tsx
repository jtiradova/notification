import React from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { boxVariants } from "@singlestore/fusion/components/layout/box";
import { split } from "@singlestore/fusion/utils/object";
import type { VariantProps } from "cva";
import { cva, cx } from "cva";

import "./fa-icon.scss";

type Emify<T extends string> = T extends `${infer N}x` ? `${N}em` : T;

type SizeProp =
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";

type FontAwesomeSizeMapType = {
    [K in Emify<SizeProp>]: K extends `${infer N}em` ? `${N}x` : K;
};

/**
 * We map the font awesome size prop to different keys to avoid confusing
 * font awesome's "1x" with our sizing system.
 * 1x in font awesome is 1em, whereas 1x in our sizing system is .5rem (8px);
 */
const fontAwesomeSizeMap: FontAwesomeSizeMapType = {
    "2xs": "2xs",
    xs: "xs",
    sm: "sm",
    xl: "xl",
    "2xl": "2xl",
    lg: "lg",
    "1em": "1x",
    "2em": "2x",
    "3em": "3x",
    "4em": "4x",
    "5em": "5x",
    "6em": "6x",
    "7em": "7x",
    "8em": "8x",
    "9em": "9x",
    "10em": "10x",
};

type ModifiedFontAwesomeIconProps = Omit<
    React.SVGProps<SVGSVGElement>,
    "size"
> & {
    icon: IconDefinition;
    size?: keyof typeof fontAwesomeSizeMap;
    title?: string;
};

export type FaIconProps = ModifiedFontAwesomeIconProps &
    VariantProps<typeof icon>;

export const iconVariants = {
    ...boxVariants,
    fixedWidth: {
        true: "fa-fw",
    },
    spin: {
        true: "fa-spin",
    },
};

export const iconVariantPropsKeys = Object.keys(iconVariants) as Array<
    keyof typeof iconVariants
>;

export const icon = cva({
    base: "sui-c-icon svg-inline--fa",
    variants: iconVariants,
});

export const FaIcon = React.forwardRef<
    React.ElementRef<React.FC<React.SVGProps<SVGSVGElement>>>,
    FaIconProps
>((props, forwardedRef) => {
    const { icon: iconProps, children, className, ...rest } = props;
    const [iconVariantProps, fontAwesomeIconProps] = split(
        rest,
        iconVariantPropsKeys
    );

    const { size = "1em", title, ...restIconProps } = fontAwesomeIconProps;

    const { icon: iconValues, prefix, iconName } = iconProps;
    const [width, height, _ligatures, _unicode, svgPathData] = iconValues;

    const classes = cx(className, `fa-${fontAwesomeSizeMap[size]}`);

    let svgs;
    if (Array.isArray(svgPathData)) {
        svgs = (
            <g>
                <path d={svgPathData[0]} className="fa-primary" />
                <path d={svgPathData[1]} className="fa-secondary" />
            </g>
        );
    } else {
        svgs = <path d={svgPathData} />;
    }

    return (
        <svg
            ref={forwardedRef}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden={title ? undefined : true}
            aria-label={title}
            focusable={title ? undefined : false}
            data-fa={`${prefix}-${iconName}`}
            data-icon={iconName}
            className={icon({
                ...iconVariantProps,
                class: classes,
            })}
            {...restIconProps}
        >
            {children}
            {title && <title>{title}</title>}
            {svgs}
        </svg>
    );
});
