import type { MaybeEnumPropDef, PropDef } from "@singlestore/fusion/props";
import { layoutPropDefs, marginPropDefs } from "@singlestore/fusion/props";
import type { ArgTypes, Meta, StoryObj } from "@storybook/react";
import { Box } from "./box";
import { boxPropDefs } from "./box.props";

const meta: Meta<typeof Box> = {
    title: "WIP / Box",
    component: Box,
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

const boxOwnArgs = Object.entries(boxPropDefs).reduce(reducer, {} as ArgTypes);
const layoutArgs = Object.entries(layoutPropDefs).reduce(
    reducer,
    {} as ArgTypes
);
const marginArgs = Object.entries(marginPropDefs).reduce(
    reducer,
    {} as ArgTypes
);

export const Showcase: StoryObj<typeof Box> = {
    argTypes: {
        ...boxOwnArgs,
        ...layoutArgs,
        ...marginArgs,
    },
    render: (args) => {
        return <Box {...args}>I'm a box</Box>;
    },
};
