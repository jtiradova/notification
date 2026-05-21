import { Separator } from "@singlestore/fusion/components/separator/separator";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../layout";

const meta: Meta<typeof Separator> = {
    title: "Components / Separator",
    tags: ["autodocs"],
    component: Separator,
    decorators: [
        (Story) => (
            <Box minHeight="30x">
                <Story />
            </Box>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Showcase: Story = {
    args: {
        size: "4",
    },
};

export const Size1: Story = {
    name: "[Size] 1",
    args: {
        size: "1",
    },
};

export const Size2: Story = {
    name: "[Size] 2",
    args: {
        size: "2",
    },
};

export const Size3: Story = {
    name: "[Size] 3",
    args: {
        size: "3",
    },
};

export const Size4: Story = {
    name: "[Size] 4",
    args: {
        size: "4",
    },
};

export const ColorPrimary: Story = {
    name: "[Color] Primary",
    args: {
        color: "primary",
    },
};

export const ColorSecondary: Story = {
    name: "[Color] Secondary",
    args: {
        color: "secondary",
    },
};

export const ColorBrand: Story = {
    name: "[Color] Brand",
    args: {
        color: "brand",
    },
};

export const ColorPositive: Story = {
    name: "[Color] Positive",
    args: {
        color: "positive",
    },
};

export const ColorWarning: Story = {
    name: "[Color] Warning",
    args: {
        color: "warning",
    },
};

export const ColorCritical: Story = {
    name: "[Color] Critical",
    args: {
        color: "critical",
    },
};

export const ColorInfo: Story = {
    name: "[Color] Info",
    args: {
        color: "info",
    },
};

export const Decorative: Story = {
    name: "Decorative",
    args: {
        decorative: true,
    },
};

export const ResponsiveSizes: Story = {
    name: "Responsive Sizes",
    args: {
        size: {
            initial: "1",
            xs: "3",
            sm: "2",
            md: "4",
            lg: "1",
        },
    },
};

export const OrientationHorizontal: Story = {
    name: "[Orientation] Horizontal",
    args: {
        orientation: "horizontal",
    },
};

export const OrientationVertical: Story = {
    name: "[Orientation] Vertical",
    args: {
        orientation: "vertical",
        size: "3",
    },
};
