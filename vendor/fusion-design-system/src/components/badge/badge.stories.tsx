import { Badge } from "@singlestore/fusion/components/badge/badge";
import type { StoryObj } from "@storybook/react";
import { BadgeGroup } from "./badge-group";

export default {
    title: "Components / Badge",
    component: Badge,
    tags: ["autodocs"],
};

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
    args: {
        children: "Primary",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary",
        variant: "secondary",
    },
};

export const Neutral: Story = {
    args: {
        children: "Neutral",
        variant: "neutral",
    },
};

export const Positive: Story = {
    args: {
        children: "Positive",
        variant: "positive",
    },
};

export const Critical: Story = {
    args: {
        children: "Critical",
        variant: "critical",
    },
};

export const Info: Story = {
    args: {
        children: "Info",
        variant: "info",
    },
};

export const WithinBadgeGroup: Story = {
    render: () => (
        <BadgeGroup>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="info">Secondary</Badge>
        </BadgeGroup>
    ),
};
