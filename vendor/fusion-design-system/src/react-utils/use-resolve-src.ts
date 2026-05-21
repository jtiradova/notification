import type { ThemeConditionalValue } from "@singlestore/fusion/theme-context";
import { useTheme } from "@singlestore/fusion/theme-context";

// given a src string or a theme conditional src object, return the resolved
// src string
type UseResolvedThemedSrc = () => (
    src?: Maybe<string | ThemeConditionalValue<string>>
) => Maybe<string>;

export const useResolveSrc: UseResolvedThemedSrc = () => {
    const { themeConditional } = useTheme();

    const resolve = (src?: string | ThemeConditionalValue<string>) => {
        if (src === undefined) {
            return undefined;
        }

        return typeof src === "string" ? src : themeConditional(src);
    };

    return resolve;
};
