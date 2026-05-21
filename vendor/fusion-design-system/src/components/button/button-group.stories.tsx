import {
    faChevronDown,
    faEllipsisV,
    faPlus,
} from "@fortawesome/sharp-regular-svg-icons";
import {
    Button,
    IconButton,
} from "@singlestore/fusion/components/button/button";
import { ButtonGroup } from "@singlestore/fusion/components/button/button-group";
import type { Meta, StoryObj } from "@storybook/react";

import { faBug, faExternalLink } from "@fortawesome/sharp-solid-svg-icons";
import { sourceIconTransform } from "../../utils/storybook";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../dropdown-menu";

const meta: Meta<typeof ButtonGroup> = {
    title: "Components / ButtonGroup",
    component: ButtonGroup,
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

    argTypes: {
        attached: {
            control: {
                type: "boolean",
            },
        },
        gap: {
            if: { arg: "attached", truthy: false },
            control: {
                type: "text",
            },
        },
        variant: {
            control: {
                type: "text",
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Attached: Story = {
    args: {
        attached: true,
        gap: "1x",
        variant: "outline-neutral" as const,
        children: [
            <Button>Connect</Button>,
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
            </DropdownMenu>,
        ],
    },
};

export const WithGap: Story = {
    args: {
        attached: false,
        gap: undefined,
        children: [
            <IconButton
                aria-label="Button"
                title="Button 2"
                icon={faEllipsisV}
            />,
            <Button>Connect</Button>,
            <Button variant="solid-brand" leftIcon={faPlus}>
                Create workspace
            </Button>,
        ],
    },
};

export const DisableEntireGroup: Story = {
    args: {
        attached: false,
        gap: undefined,
        disabled: true,
        children: [
            <Button>Connect</Button>,
            <Button variant="solid-brand" leftIcon={faPlus}>
                Create workspace
            </Button>,
        ],
    },
};

export const GroupProps: Story = {
    args: {
        variant: "outline-brand" as const,
        size: "small",
        disabled: false,
        attached: false,
        gap: undefined,
        children: [
            <Button>Connect</Button>,
            <Button leftIcon={faPlus}>Create workspace</Button>,
        ],
    },
};
