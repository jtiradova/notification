import type { MaybeEnumPropDef, PropDef } from "@singlestore/fusion/props";
import { layoutPropDefs, marginPropDefs } from "@singlestore/fusion/props";
import type { ArgTypes, Meta, StoryObj } from "@storybook/react";
import { Grid } from "./grid";
import { gridPropDefs } from "./grid.props";
import { Box } from "../box/box";

const meta: Meta<typeof Grid> = {
    title: "WIP / Grid",
    component: Grid,
    tags: ["autodocs"],
};

export default meta;

const reducer = (acc: ArgTypes, [key, value]: [string, PropDef]) => {
    if (value.type.includes("enum")) {
        const enumValue = value as MaybeEnumPropDef<any>;

        const description = enumValue.type.replace(
            "enum",
            enumValue.values.map((value) => `\`${value}\``).join(" | ")
        );

        acc[key] = {
            control: "select",
            options: enumValue.values,
            description,
        };
    } else {
        acc[key] = {
            control: "text",
        };
    }
    return acc;
};

const gridOwnArgs = Object.entries(gridPropDefs).reduce(
    reducer,
    {} as ArgTypes
);
const layoutArgs = Object.entries(layoutPropDefs).reduce(
    reducer,
    {} as ArgTypes
);
const marginArgs = Object.entries(marginPropDefs).reduce(
    reducer,
    {} as ArgTypes
);

export const Showcase: StoryObj<typeof Grid> = {
    argTypes: {
        ...gridOwnArgs,
        ...layoutArgs,
        ...marginArgs,
    },

    render: (args) => {
        return <Grid {...args}>I'm a grid</Grid>;
    },
};

export const HolyGrail: StoryObj<typeof Grid> = {
    argTypes: {
        ...gridOwnArgs,
        ...layoutArgs,
        ...marginArgs,
    },
    args: {
        columns: { sm: "200px 2fr 200px" },
        rows: {
            sm: "auto 1fr auto",
        },
        height: "50vh",
    },
    parameters: {
        layout: "fullscreen",
    },
    render: (args) => {
        return (
            <>
                <style>
                    {`
                header {
                    background-color: lightblue;
                }

                nav {
                    background-color: lightgreen;
                }

                main {
                    background-color: lightyellow;
                }

                aside {
                    background-color: lightpink;
                }

                footer {
                    background-color: lightcoral;
                }
                `}
                </style>
                <Grid {...args}>
                    <Box asChild p="sm" gridColumn={{ sm: "span 3" }}>
                        <header>Header</header>
                    </Box>
                    <Box asChild p="sm">
                        <nav>Navigation</nav>
                    </Box>
                    <Box asChild p="sm">
                        <main>Main</main>
                    </Box>
                    <Box asChild p="sm">
                        <aside>Aside</aside>
                    </Box>
                    <Box asChild p="sm" gridColumn={{ sm: "span 3" }}>
                        <footer>Footer</footer>
                    </Box>
                </Grid>
            </>
        );
    },
};
