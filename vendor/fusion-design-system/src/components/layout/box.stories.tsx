/* eslint-disable react/jsx-pascal-case */
import { Card } from "@singlestore/fusion/components/card/card";
import { Box, box } from "@singlestore/fusion/components/layout/box";
import { Flex } from "@singlestore/fusion/components/layout/flex";
import { Span } from "@singlestore/fusion/components/typography";
import { H2 } from "@singlestore/fusion/components/typography/heading";
import type { Dict } from "@singlestore/fusion/utils/types";
import type { Meta } from "@storybook/react";
import React from "react";

const meta: Meta<typeof Box> = {
    title: "Components / Layout / Box",
    component: Box,
    tags: ["autodocs"],
};

export default meta;

export const BasicUsage = (args: Dict) => (
    <div>
        <Box {...args} background="purple-inverse-1" p="2x">
            <_Item mb="2x" maxWidth="2/3">
                Box item 1
            </_Item>
            <_Item>Box item 2</_Item>
        </Box>
    </div>
);

BasicUsage.args = {
    py: "4x",
    px: "6x",
    mb: "8x",
};

const _Item = ({ p = "2x", ...rest }: React.ComponentProps<typeof Box>) => (
    <Box background="purple-1" p={p} color="purple-1" {...rest} />
);

export const RenderAsAnyElement = () => (
    <div>
        <Flex flexDirection="column" gap="2x">
            <Span>
                <b>
                    Using{" "}
                    <code>{`<Box asChild ... />`} with a HTML element</code>
                </b>
            </Span>
            <Box asChild py="4x" px="6x" mb="8x" background="purple-inverse-1">
                <section>
                    <_Item mb="2x">Box as {`<section>`} item 1</_Item>
                    <_Item>Box as {`<section>`} item 2</_Item>
                </section>
            </Box>
        </Flex>

        <Flex flexDirection="column" gap="2x">
            <Span>
                <b>
                    Using{" "}
                    <code>{`<Box asChild ... />`} with a React component</code>
                </b>
            </Span>
            <Box asChild py="4x" px="6x" mb="8x">
                <Card onClick={() => alert("I rendered as a <Card>")}>
                    <_Item mb="2x">Box as {`<Card>`} item 1</_Item>
                    <_Item>Box as {`<Card>`} item 2</_Item>
                </Card>
            </Box>
        </Flex>

        <Flex flexDirection="column" gap="2x">
            <Span>
                <b>
                    Using <code>{`className={box({ ... })}`}</code>
                </b>
            </Span>
            <section
                className={box({
                    py: "4x",
                    px: "6x",
                    mb: "8x",
                    background: "purple-inverse-1",
                })}
            >
                <_Item mb="2x">Box as {`<section>`} item 1</_Item>
                <_Item>Box as {`<section>`} item 2</_Item>
            </section>
        </Flex>
    </div>
);

export const NegativeSpacing = () => {
    return (
        <Box>
            <H2 variant="heading-2" color="low-contrast">
                Inspect to see negative margin at work
            </H2>
            <Box p="4x" maxWidth="12x">
                <Box background="purple-1" m="negative-4x" p="2x">
                    My container has padding but I Have negative margin so you
                    can't notice
                </Box>
            </Box>
        </Box>
    );
};

RenderAsAnyElement.args = {};
