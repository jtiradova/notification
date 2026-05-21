import type { MaybeEnumPropDef, PropDef } from "@singlestore/fusion/props";
import { layoutPropDefs, marginPropDefs } from "@singlestore/fusion/props";
import type { ArgTypes, Meta, StoryObj } from "@storybook/react";
import { Flex } from "./flex";
import { flexPropDefs } from "./flex.props";

const meta: Meta<typeof Flex> = {
    title: "WIP / Flex",
    component: Flex,
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

const flexOwnArgs = Object.entries(flexPropDefs).reduce(
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

export const Showcase: StoryObj<typeof Flex> = {
    argTypes: {
        ...flexOwnArgs,
        ...layoutArgs,
        ...marginArgs,
    },
    render: (args) => {
        return <Flex {...args}>I'm a flex</Flex>;
    },
};
