import { Box, Flex, box } from "@singlestore/fusion/components/layout";
import { Button } from "@singlestore/fusion/components/button";
import {
    Paragraph,
    Code,
    Span,
} from "@singlestore/fusion/components/typography";
import type { Meta } from "@storybook/react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger,
} from "@singlestore/fusion/components/tooltip";
import React from "react";

const meta: Meta<typeof Tooltip> = {
    title: "Components / Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <TooltipProvider>
                <Story />
            </TooltipProvider>
        ),
    ],
};

export default meta;

export function BasicTooltip() {
    return (
        <Box p="4x">
            <Tooltip content="This is a basic tooltip">
                <Button>Hover me</Button>
            </Tooltip>
            <Paragraph variant="body-2" mt="2x">
                Note: Remember to wrap your application with{" "}
                <Code>TooltipProvider</Code> to use tooltips
            </Paragraph>
        </Box>
    );
}

export function WithCustomContent() {
    return (
        <Box p="4x">
            <Tooltip
                content={
                    <Paragraph color="yellow-1">
                        This is a tooltip with <Code>custom</Code> content
                    </Paragraph>
                }
            >
                <Button>Hover for custom content</Button>
            </Tooltip>
        </Box>
    );
}

export function PositionsDemo() {
    const sides = ["top", "left", "right", "bottom"] as const;
    const aligns = ["start", "center", "end"] as const;

    return (
        <Box
            p="4x"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridGap: "4x",
            }}
        >
            {sides.map((side) =>
                aligns.map(
                    (align): JSX.Element => (
                        <Flex key={side} justifyContent="center">
                            <Tooltip
                                content={
                                    <>
                                        <Span>Side: {side}</Span>
                                        <br />
                                        <Span>Align: {align}</Span>
                                    </>
                                }
                                side={side}
                                align={align}
                            >
                                <Button variant="ghost-neutral">
                                    {side}-{align}
                                </Button>
                            </Tooltip>
                        </Flex>
                    )
                )
            )}
        </Box>
    );
}

export function LongTextTooltip() {
    return (
        <Box p="4x">
            <Tooltip content="This is a tooltip with longer text. It demonstrates how tooltips handle more content gracefully. The text wraps when it exceeds the maximum width.">
                <Button>Hover for longer text</Button>
            </Tooltip>
        </Box>
    );
}

export function CustomStylingTooltip() {
    return (
        <Box p="4x">
            <Tooltip
                content="This tooltip has custom styling"
                className={box({ p: "4x" })}
            >
                <Button variant="solid-brand">Custom styled tooltip</Button>
            </Tooltip>
        </Box>
    );
}

export function DisabledTooltip() {
    return (
        <Flex p="4x" gap="2x">
            <Tooltip content="This tooltip is enabled" disabled={false}>
                <Button>Enabled tooltip</Button>
            </Tooltip>

            <Tooltip content="You should not see this" disabled={true}>
                <Button variant="ghost-neutral">Disabled tooltip</Button>
            </Tooltip>
        </Flex>
    );
}

export function UpdateTooltipDisabledState() {
    const [disabled, setDisabled] = React.useState(false);

    return (
        <Flex p="4x" gap="2x" alignItems="center">
            <Tooltip content="This button toggles the tooltip disabled state of the next button">
                <Button onClick={() => setDisabled(!disabled)}>
                    {disabled ? "Disable" : "Enable"} Tooltip
                </Button>
            </Tooltip>

            <Tooltip
                disabled={disabled}
                content="This tooltip's disabled state is controlled"
            >
                <Button>Hover me (tooltip disabled: {String(disabled)})</Button>
            </Tooltip>
        </Flex>
    );
}

export function TooltipOnDisabledButton() {
    return (
        <Box p="4x">
            <Tooltip content="This tooltip is on a disabled button">
                <Button disabled>Disabled button with tooltip</Button>
            </Tooltip>
        </Box>
    );
}

export function TooltipWithMultipleChildren() {
    const email = "john.doe@example.com";
    const firstName = "John";
    const lastName = "Doe";

    return (
        <Flex p="4x" gap="2x" alignItems="center">
            <Tooltip content={email}>
                {firstName} {lastName}
            </Tooltip>
            <Tooltip content="This is a tooltip with multiple children">
                <Button variant="solid-brand">Hover me</Button>
                <Button variant="ghost-neutral">And me too</Button>
            </Tooltip>
        </Flex>
    );
}

export function TooltipOnEllipsisText() {
    return (
        <Box p="4x">
            <Tooltip
                content="This is a very long text that will be truncated with an
                    ellipsis if it exceeds the container width."
                side="right"
            >
                <Paragraph width="15x" ellipsis>
                    This is a very long text that will be truncated with an
                    ellipsis if it exceeds the container width.
                </Paragraph>
            </Tooltip>
        </Box>
    );
}

export function WithTooltipParts() {
    return (
        <Box p="4x">
            <Paragraph mb="2x">
                For more control over tooltip rendering, you can use the
                individual parts
            </Paragraph>
            <TooltipRoot>
                <TooltipTrigger>
                    <Button variant="solid-brand">Advanced usage</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="tooltip">
                        <b>Custom formatted</b> tooltip content with{" "}
                        <Code>direct</Code> control
                    </div>
                </TooltipContent>
            </TooltipRoot>
        </Box>
    );
}

export function ConfiguringTooltipProvider() {
    return (
        <TooltipProvider delayDuration={800} skipDelayDuration={300}>
            <Flex p="4x" gap="2x">
                <Tooltip content="Appears with 800ms delay">
                    <Button>First button</Button>
                </Tooltip>

                <Tooltip content="Also uses the same delay settings">
                    <Button variant="ghost-neutral">Second button</Button>
                </Tooltip>

                <Paragraph mt="2x" ml="2x">
                    You can configure delay duration and other properties at the
                    Provider level to affect all tooltips
                </Paragraph>
            </Flex>
        </TooltipProvider>
    );
}
