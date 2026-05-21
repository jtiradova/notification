import { Avatar } from "@singlestore/fusion/components/avatar/avatar";
import { action } from "@storybook/addon-actions";
import type { StoryObj } from "@storybook/react";

export default {
    title: "Components / Avatar",
    tags: ["autodocs"],
    component: Avatar,
};

type Story = StoryObj<typeof Avatar>;

export const Showcase: Story = {
    args: {
        fallback: "SS",
        src: "https://picsum.photos/200",
        onLoadingStatusChange: action("onLoadingStatusChange"),
    },
};

export const Fallback: Story = {
    args: {
        fallback: "SS",
    },
};

export const onLoadingStatusChange: Story = {
    args: {
        fallback: "SS",
        src: "https://picsum.photos/200",
        onLoadingStatusChange: action("onLoadingStatusChange"),
    },
};

export const RadiusRounded: Story = {
    name: "[Radius] Rounded",
    args: {
        fallback: "SS",
        radius: "rounded",
    },
};

export const RadiusCircle: Story = {
    name: "[Radius] Circle",
    args: {
        fallback: "SS",
        radius: "circle",
    },
};

export const ColorBrand: Story = {
    name: "[Color] Brand",
    args: {
        fallback: "SS",

        color: "brand",
    },
};

export const ColorNeutral: Story = {
    name: "[Color] Neutral",
    args: {
        fallback: "SS",

        color: "neutral",
    },
};

export const Size1OneLetter: Story = {
    name: "[Size] 1 (One Letter)",
    args: {
        fallback: "S",
        size: "1",
    },
};
export const Size1TwoLetters: Story = {
    name: "[Size] 1 (Two Letters)",
    args: {
        fallback: "SS",
        size: "1",
    },
};

export const Size2OneLetter: Story = {
    name: "[Size] 2 (One Letter)",
    args: {
        fallback: "S",
        size: "2",
    },
};

export const Size2TwoLetters: Story = {
    name: "[Size] 2 (Two Letters)",
    args: {
        fallback: "SS",
        size: "2",
    },
};

export const Size3OneLetter: Story = {
    name: "[Size] 3 (One Letter)",
    args: {
        fallback: "S",
        size: "3",
    },
};

export const Size3TwoLetters: Story = {
    name: "[Size] 3 (Two Letters)",
    args: {
        fallback: "SS",
        size: "3",
    },
};

export const Size4OneLetter: Story = {
    name: "[Size] 4 (One Letter)",
    args: {
        fallback: "S",
        size: "4",
    },
};

export const Size4TwoLetters: Story = {
    name: "[Size] 4 (Two Letters)",
    args: {
        fallback: "SS",
        size: "4",
    },
};

export const ResponsiveSizes: Story = {
    name: "Responsive Sizes",
    args: {
        fallback: "SS",
        size: {
            initial: "1",
            xs: "3",
            sm: "2",
            md: "3",
            lg: "1",
        },
    },
};
