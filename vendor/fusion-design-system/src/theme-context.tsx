import React from "react";

import { useLocalStorage } from "@singlestore/fusion/react-utils/use-local-storage";
import { useMediaQuery } from "@singlestore/fusion/react-utils/use-media-query";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export type Theme = "light" | "dark";
export type ThemePreference = "system" | Theme;

export type ThemeConditionalValue<TLight, TDark = TLight> = {
    light: TLight;
    dark: TDark;
};

export type ThemeConditionalFn = <TLight, TDark = TLight>(
    value: ThemeConditionalValue<TLight, TDark>
) => TLight | TDark;

type ThemeContextType = {
    theme: Theme;
    themePreference: ThemePreference;
    setThemePreference: (
        value: ThemePreference | ((prev: ThemePreference) => ThemePreference)
    ) => void;
    isUsingCustomTheme: boolean;
    setIsUsingCustomTheme: (
        value: boolean | ((prev: boolean) => boolean)
    ) => void;
    customTheme: string;
    setCustomTheme: (theme: string | ((prev: string) => string)) => void;
    themeConditional: ThemeConditionalFn;
    isDarkMode: boolean;
};

export const ThemeContext =
    React.createContext<Nullable<ThemeContextType>>(null);

type ThemeProviderProps = React.PropsWithChildren<
    Partial<Pick<ThemeContextType, "themePreference" | "setThemePreference">>
>;

export function ThemeProvider(props: ThemeProviderProps) {
    const isOSDark = useMediaQuery(COLOR_SCHEME_QUERY);
    const systemTheme = isOSDark ? "dark" : "light";

    const [themePreferenceLocalStorage, setThemePreferenceLocalStorage] =
        useLocalStorage<ThemePreference>("singlestore-ui-theme", "system");
    const [storedCustomTheme, setStoredCustomTheme] = useLocalStorage(
        "singlestore-ui-custom-theme",
        ""
    );
    const [isUsingCustomTheme, setIsUsingCustomTheme] =
        useLocalStorage<boolean>("singlestore-ui-using-custom-theme", false);

    let themePreference = themePreferenceLocalStorage;
    if (props.themePreference) {
        themePreference = props.themePreference;
    }

    let setThemePreference = setThemePreferenceLocalStorage;
    if (props.setThemePreference) {
        setThemePreference = props.setThemePreference;
    }

    const theme = themePreference === "system" ? systemTheme : themePreference;

    const themeConditional: ThemeConditionalFn = (value) => {
        return value[theme];
    };

    React.useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark-mode", "dark");
            document.body.classList.remove("light-mode", "light");
        } else {
            document.body.classList.add("light-mode", "light");
            document.body.classList.remove("dark-mode", "dark");
        }
    }, [theme]);

    React.useEffect(() => {
        const currentStyle = document.getElementById("sui-custom-theme");
        if (currentStyle) {
            currentStyle.remove();
        }
        if (isUsingCustomTheme) {
            const headEl = document.querySelector("head");
            const style = document.createElement("style");
            style.setAttribute("id", "sui-custom-theme");
            style.innerText = storedCustomTheme;
            headEl?.appendChild(style);
        }
    }, [isUsingCustomTheme, storedCustomTheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themePreference,
                setThemePreference,
                themeConditional,
                isUsingCustomTheme,
                setIsUsingCustomTheme,
                customTheme: storedCustomTheme,
                setCustomTheme: setStoredCustomTheme,
                isDarkMode: theme === "dark",
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = React.useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
