import {
    faBug,
    faChevronDown,
    faEllipsisV,
    faExternalLink,
    faPlus,
} from "@fortawesome/sharp-solid-svg-icons";
import type { Meta, StoryObj } from "@storybook/react";
import { sourceIconTransform } from "../../utils/storybook";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button, IconButton } from "./button";
import { ButtonGroup } from "./button-group";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            source: {
                transform: (code: string) => {
                    return sourceIconTransform(code);
                },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Showcase: Story = {
    args: {
        size: "medium",
        variant: "solid-brand",
        disabled: false,
        loading: false,
        highlighted: false,
        children: "Click me!",
    },
};

export const Small: Story = {
    name: "[Size] Small",
    args: {
        size: "small",
        variant: "solid-brand",
        children: "Click me!",
    },
};

export const Medium: Story = {
    name: "[Size] Medium",

    args: {
        size: "medium",
        variant: "solid-brand",
        children: "Click me!",
    },
};

export const Large: Story = {
    name: "[Size] Large",
    args: {
        size: "large",
        variant: "solid-brand",
        children: "Click me!",
    },
};

export const OutlineNeutral: Story = {
    name: "[Variant] Outline Neutral",
    args: {
        variant: "outline-neutral",
        children: "Click me!",
    },
};

export const OutlineBrand: Story = {
    name: "[Variant] Outline Brand",
    args: {
        variant: "outline-brand",
        children: "Click me!",
    },
};

export const SolidNeutral: Story = {
    name: "[Variant] Solid Neutral",
    args: {
        variant: "solid-neutral",
        children: "Click me!",
    },
};

export const SolidBrand: Story = {
    name: "[Variant] Solid Brand",
    args: {
        variant: "solid-brand",
        children: "Click me!",
    },
};

export const GhostNeutral: Story = {
    name: "[Variant] Ghost Neutral",
    args: {
        variant: "ghost-neutral",
        children: "Click me!",
    },
};

export const GhostBrand: Story = {
    name: "[Variant] Ghost Brand",
    args: {
        variant: "ghost-brand",
        children: "Click me!",
    },
};

export const WithIcons: Story = {
    args: {
        leftIcon: faPlus,
        rightIcon: faChevronDown,
        children: "Click me!",
    },
};

export const Loading: Story = {
    args: {
        loading: true,
        children: "Click me!",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: "Click me!",
    },
};

export const IconOnly: StoryObj<typeof IconButton> = {
    name: "Icon Only (IconButton)",
    args: {
        icon: faEllipsisV,
        "aria-label": "More options",
    },
    render: (args) => {
        return <IconButton {...args} />;
    },
};

export const Highlighted: Story = {
    args: {
        highlighted: true,
        children: "Click me!",
    },
    render: (args) => {
        return (
            <DropdownMenu open modal={false}>
                <DropdownMenuTrigger>
                    <Button rightIcon={faChevronDown} {...args} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Do something</DropdownMenuItem>
                    <DropdownMenuItem>Do something else</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
};

export const WithinButtonGroup: StoryObj<typeof ButtonGroup> = {
    argTypes: {
        variant: {
            control: {
                type: "text",
                // options: buttonVariants,
            },
        },
    },
    args: {
        attached: false,
        disabled: false,
        size: "medium",

        variant: undefined,
    },
    render: (args) => {
        return (
            <ButtonGroup {...args}>
                <IconButton
                    aria-label="Button"
                    title="Button 2"
                    icon={faEllipsisV}
                />
                <Button>Connect</Button>
                <Button variant="solid-brand" leftIcon={faPlus}>
                    Create workspace
                </Button>
            </ButtonGroup>
        );
    },
};

export const WithinAttachedButtonGroup: StoryObj<typeof ButtonGroup> = {
    args: {
        attached: true,
        disabled: false,
        size: "medium",
        gap: undefined,
        variant: "outline-neutral" as const,
    },
    render: (args) => {
        return (
            <ButtonGroup {...args}>
                <Button>Connect</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <IconButton
                            aria-label="Button"
                            title="Button 2"
                            icon={faChevronDown}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem leftIcon={faExternalLink}>
                            Open in SQL Editor
                        </DropdownMenuItem>
                        <DropdownMenuItem leftIcon={faBug}>
                            Report a bug
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ButtonGroup>
        );
    },
};

export const RenderAsLink: Story = {
    args: {
        variant: "solid-brand",
    },
    render: (args) => {
        return (
            <Button asChild {...args}>
                <a href="https://www.singlestore.com" target="_blank">
                    Click me!
                </a>
            </Button>
        );
    },
};
