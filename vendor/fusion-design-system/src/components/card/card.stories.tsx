import { faker } from "@faker-js/faker";

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Card } from "./card";
import { Box } from "../layout";
import { H1, Paragraph } from "../typography";

const meta: Meta<typeof Card> = {
    title: "Components / Card",
    component: Card,
    tags: ["autodocs"],
    decorators: [(Story) => <Box maxWidth="30x">{Story()}</Box>],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Showcase: Story = {
    args: {
        children: "I'm a card",
    },
};

export const RenderAsLink: Story = {
    render: () => {
        return (
            <Card asChild>
                <a
                    href="https://www.singlestore.com"
                    target="_blank"
                    onClick={(e) => {
                        e.preventDefault();
                        action("clicked")(e);
                    }}
                >
                    <H1 mb="1x">{faker.name.fullName()}</H1>
                    <Paragraph>{faker.lorem.paragraph()}</Paragraph>
                </a>
            </Card>
        );
    },
};

export const RenderAsButton: Story = {
    render: () => {
        return (
            <Card asChild>
                <button onClick={action("clicked")}>
                    <H1 mb="1x">{faker.name.fullName()}</H1>
                    <Paragraph>{faker.lorem.paragraph()}</Paragraph>
                </button>
            </Card>
        );
    },
};
