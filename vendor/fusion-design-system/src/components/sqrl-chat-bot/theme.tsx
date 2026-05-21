import { LIGHT_HEX_COLORS } from "@singlestore/fusion/tokens/js/variables";

// syntax highlighter overrides
const singleStoreCodeStyles = {
    hljs: {
        padding: "12px",
    },
    "hljs-comment": {
        color: LIGHT_HEX_COLORS["base-neutral-700"],
    },
    "hljs-prolog": {
        color: LIGHT_HEX_COLORS["base-neutral-700"],
    },
    "hljs-doctype": {
        color: LIGHT_HEX_COLORS["base-neutral-700"],
    },
    "hljs-cdata": {
        color: LIGHT_HEX_COLORS["base-neutral-700"],
    },
    "hljs-punctuation": {
        color: LIGHT_HEX_COLORS["base-neutral-700"],
    },
    "hljs-namespace": {
        opacity: 0.7,
    },
    "hljs-tag": {
        color: LIGHT_HEX_COLORS["base-neutral-700"],
    },
    "hljs-operator": {
        color: LIGHT_HEX_COLORS["base-neutral-700"],
    },
    "hljs-number": {
        color: LIGHT_HEX_COLORS["base-green-900"],
    },
    "hljs-property": {
        color: LIGHT_HEX_COLORS["base-indigo-900"],
    },
    "hljs-function": {
        color: LIGHT_HEX_COLORS["base-indigo-900"],
    },
    "hljs-tag-id": {
        color: LIGHT_HEX_COLORS["base-neutral-800"],
    },
    "hljs-selector": {
        color: LIGHT_HEX_COLORS["base-neutral-800"],
    },
    "hljs-atrule-id": {
        color: LIGHT_HEX_COLORS["base-neutral-800"],
    },
    "hljs-string": {
        color: LIGHT_HEX_COLORS["base-yellow-900"],
    },
    "hljs-boolean": {
        color: LIGHT_HEX_COLORS["base-cyan-900"],
    },
    "hljs-entity": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-url": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-attr-value": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-keyword": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-control": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-directive": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-unit": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-statement": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-regexp": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-atrule": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-placeholder": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-variable": {
        color: LIGHT_HEX_COLORS["base-purple-900"],
    },
    "hljs-deletion": {
        textDecorationLine: "line-through",
    },
    "hljs-addition": {
        textDecorationLine: "underline",
    },
    "hljs-emphasis": {
        fontStyle: "italic",
    },
};

export const inkeepWidgetTheme = {
    fontUrls: [
        "https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400&family=Lato&display=swap",
    ],
    tokens: {
        fonts: {
            heading: `'Lato', sans-serif`,
            body: `'Lato', sans-serif`,
            mono: `'Inconsolata', monospace`,
        },
        zIndex: {
            overlay: "3000",
            modal: "3100",
            popover: "3200",
            skipLink: "3300",
            toast: "3400",
            tooltip: "3500",
        },
    },
    components: {
        AIChatPageWrapper: {
            style: {
                color: LIGHT_HEX_COLORS["base-neutral-800"],
                lineHeight: "1.5em",
                width: {
                    base: "100%",
                    md: "100%",
                },
                height: {
                    base: "100%",
                    md: "700px",
                },
                position: {
                    base: "relative",
                    md: "relative",
                },
            },
        },
        Code: {
            style: {
                backgroundColor: LIGHT_HEX_COLORS["base-neutral-100"],
                border: `1px solid ${LIGHT_HEX_COLORS["base-neutral-300"]}`,
                color: LIGHT_HEX_COLORS["base-neutral-800"],
                borderRadius: "4px",
                fontStyle: "mono",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "1em",
                py: "2px",
            },
        },
        Sup: {
            style: {
                a: {
                    background: LIGHT_HEX_COLORS["base-purple-400"],
                    color: LIGHT_HEX_COLORS["base-purple-900"],
                    px: "4px",
                    py: "1px",
                    borderRadius: "4px",
                    fontWeight: "700",
                },
            },
        },
        CodeBlockHeader: {
            style: {
                background: LIGHT_HEX_COLORS["base-neutral-100"],
                border: `1px solid ${LIGHT_HEX_COLORS["base-neutral-300"]}`,
                color: LIGHT_HEX_COLORS["base-neutral-800"],
                button: {
                    color: LIGHT_HEX_COLORS["base-neutral-700"],
                    _hover: {
                        color: LIGHT_HEX_COLORS["base-neutral-800"],
                    },
                },
            },
        },
        SyntaxHighlighter: {
            highlighter: "hljs",
            highlighterTheme: singleStoreCodeStyles,
            style: {
                backgroundColor: LIGHT_HEX_COLORS["base-neutral-200"],
                color: LIGHT_HEX_COLORS["base-neutral-900"],
                border: `1px solid ${LIGHT_HEX_COLORS["base-neutral-300"]}`,
                borderTop: "none",
                lineHeight: "1.5em",
            },
        },
        Tooltip: {},
    },
};
