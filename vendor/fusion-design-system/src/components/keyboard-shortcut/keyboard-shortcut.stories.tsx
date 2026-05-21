import { H2, Paragraph, Span } from "../typography";
import { KeyboardShortcut, getCtrlOrCmdKey } from "./keyboard-shortcut";
import { Box } from "../layout";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof KeyboardShortcut> = {
    title: "Components / KeyboardShortcut",
    component: KeyboardShortcut,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <Box maxWidth="50x">
                <Story />
            </Box>
        ),
    ],
};

export default meta;

export function Example() {
    const shortcut = `${getCtrlOrCmdKey()} C`;

    return (
        <>
            <H2>Variant = "solid"</H2>
            <Paragraph>Detecting the OS</Paragraph>
            <KeyboardShortcut variant="solid">{shortcut}</KeyboardShortcut>
            <Paragraph>Windows/Linux</Paragraph>
            <KeyboardShortcut variant="solid">Ctrl C</KeyboardShortcut>
            <Paragraph>Mac</Paragraph>
            <KeyboardShortcut variant="solid">⌘ C</KeyboardShortcut>
            <H2 mt="2x">Variant = "ghost"</H2>
            <Paragraph>Detecting the OS</Paragraph>
            <KeyboardShortcut variant="ghost">{shortcut}</KeyboardShortcut>
            <Paragraph>Windows/Linux</Paragraph>
            <KeyboardShortcut variant="ghost">Ctrl C</KeyboardShortcut>
            <Paragraph>Mac</Paragraph>
            <KeyboardShortcut variant="ghost">⌘ C</KeyboardShortcut>
            <H2 mt="2x">Inline</H2>
            <Paragraph variant="body-1">
                <Span mr="1x">Lorem Ipsum</Span>
                <KeyboardShortcut variant="solid" inline>
                    {shortcut}
                </KeyboardShortcut>
            </Paragraph>
        </>
    );
}
