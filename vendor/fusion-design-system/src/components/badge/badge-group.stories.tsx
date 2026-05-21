import { Badge } from "@singlestore/fusion/components/badge/badge";
import type { StoryObj } from "@storybook/react";
import { BadgeGroup } from "./badge-group";

export default {
    title: "Components / BadgeGroup",
    component: BadgeGroup,
    tags: ["autodocs"],
};

type Story = StoryObj<typeof BadgeGroup>;

/**
 * A layout component that groups badges together with the recommended gap between them.
 */
export const BasicUsage: Story = {
    render: () => (
        <BadgeGroup>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="info">Secondary</Badge>
        </BadgeGroup>
    ),
};
