import type { textVariants } from "@singlestore/fusion/components/typography";
import camelCase from "lodash.camelcase";
import type { StoryContext as StorybookStoryContext } from "@storybook/react";

export type StoryContext = StorybookStoryContext & {
    globals: {
        baseFontSize: string;
    };
};

// Should be updated if base font size changes from default 16px
const defaultBaseFontSize = "16";
export const fontSizeAlert =
    "The font sizes of typography variants are calculated based on the root font-size, which can have different values on different the consuming projects. " +
    `The default root font-size for most browsers is ${defaultBaseFontSize}px.`;

export const textVariantFontSizeInPx = (
    variant: keyof typeof textVariants.variant,
    context?: StoryContext
) => {
    const baseFontSize = Number(
        context?.globals?.baseFontSize.split("px")[0] || defaultBaseFontSize
    );
    return `${Math.round(
        Number(
            window
                .getComputedStyle(document.documentElement)
                .getPropertyValue(`--sui-font-size-${variant}`)
                .split("rem")[0]
        ) * baseFontSize
    )}px`;
};

/**
 * Storybook will show the literal object icon definition in the source code.
 *
 * This function will transform the source code to use the icon name instead, as expected.
 * @param code The source code string to transform
 * @param propNames The prop names who's icon definition object value to replace with the icon name
 */
export const sourceIconTransform = (
    code: string,
    propNames: Array<string> = ["leftIcon", "icon", "rightIcon"]
) => {
    return code.replace(
        new RegExp(
            `(${propNames.join(
                "|"
            )})=\\{\\{.*?iconName:\\s*'([^']+)'.*?prefix:\\s*'([^']+)'.*?\\}\\}`,
            "gs"
        ),
        (_match, propName, iconName) => {
            return `${propName}={${camelCase(`fa-${iconName}`)}}`;
        }
    );
};
