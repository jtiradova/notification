/* eslint-disable react/jsx-pascal-case */
import { Card } from "@singlestore/fusion/components/card";
import {
    Box,
    Flex,
    flex,
    InlineFlex,
} from "@singlestore/fusion/components/layout";
import { H2, Span } from "@singlestore/fusion/components/typography";
import type { Meta } from "@storybook/react";
import React from "react";

const meta: Meta<typeof Flex> = {
    title: "Components / Flex",
    component: Flex,
    tags: ["autodocs"],
};

export default meta;

const TitledBox = ({
    title,
    children,
    ...rest
}: React.ComponentProps<typeof Box> & { title: React.ReactNode }) => (
    <Box {...rest}>
        <H2 variant="heading-2" color="low-contrast" mb="1x">
            {title}
        </H2>
        {children}
    </Box>
);

const purpleFlexWithSpacingProps = (
    overrides: React.ComponentProps<typeof Flex> = {}
): React.ComponentProps<typeof Flex> => ({
    py: "4x",
    px: "6x",
    mb: "8x",
    gap: "6x",
    background: "purple-inverse-1",
    ...overrides,
});

export const BasicUsage = (args: React.ComponentProps<typeof Flex>) => (
    <div>
        <Flex {...args} background="purple-inverse-1">
            <_Item>Flex item 1</_Item>
            <_Item>Flex item 2</_Item>
        </Flex>
    </div>
);

BasicUsage.args = {
    py: "4x",
    px: "6x",
    mb: "8x",
    gap: "6x",
    justifyContent: "space-between",
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
                    <code>{`<Flex asChild ... />`} with a HTML element</code>
                </b>
            </Span>
            <Flex
                asChild
                py="4x"
                px="6x"
                mb="8x"
                gap="6x"
                justifyContent="space-between"
                background="purple-inverse-1"
            >
                <section>
                    <_Item>Flex as {`<section>`} item 1</_Item>
                    <_Item>Flex as {`<section>`} item 2</_Item>
                </section>
            </Flex>
        </Flex>

        <Flex flexDirection="column" gap="2x">
            <Span>
                <b>
                    Using{" "}
                    <code>{`<Flex asChild ... />`} with a React component</code>
                </b>
            </Span>
            <Flex
                asChild
                py="4x"
                px="6x"
                mb="8x"
                gap="6x"
                justifyContent="space-between"
            >
                <Card onClick={() => alert("I rendered as a <Card />")}>
                    <_Item>Flex as {`<Card>`} item 1</_Item>
                    <_Item>Flex as {`<Card>`} item 2</_Item>
                </Card>
            </Flex>
        </Flex>

        <Flex flexDirection="column" gap="2x">
            <Span>
                <b>
                    Using <code>{`className={flex({ ... })}`}</code>
                </b>
            </Span>
            <section
                className={flex({
                    py: "4x",
                    px: "6x",
                    mb: "8x",
                    gap: "6x",
                    justifyContent: "space-between",
                    background: "purple-inverse-1",
                })}
            >
                <_Item>Flex as {`<section>`} item 1</_Item>
                <_Item>Flex as {`<section>`} item 2</_Item>
            </section>
        </Flex>
    </div>
);

RenderAsAnyElement.args = {
    py: "4x",
    px: "6x",
    mb: "8x",
    gap: "6x",
    justifyContent: "space-between",
};

export const Showcase = () => (
    <div>
        <TitledBox title='ml="auto"'>
            <Flex {...purpleFlexWithSpacingProps()}>
                <_Item>Flex item 1</_Item>
                <_Item ml="auto">Flex item 2 with `ml="auto"`</_Item>
            </Flex>
        </TitledBox>

        <TitledBox title='justifyContent="space-between"'>
            <Flex
                justifyContent="space-between"
                {...purpleFlexWithSpacingProps()}
            >
                <_Item>Flex item 1</_Item>
                <_Item>Flex item 2</_Item>
            </Flex>
        </TitledBox>

        <TitledBox title='align_Items="center"'>
            <Flex
                alignItems="center"
                height="12x"
                {...purpleFlexWithSpacingProps({ py: "0" })}
            >
                <_Item>Flex item 1</_Item>
                <_Item>Flex item 2</_Item>
            </Flex>
        </TitledBox>

        <TitledBox title="<InlineFlex />">
            <InlineFlex {...purpleFlexWithSpacingProps()}>
                <_Item flexGrow="1">Flex item 1</_Item>
                <_Item flexGrow="1">Flex item 2</_Item>
            </InlineFlex>
        </TitledBox>

        <TitledBox title='flexWrap="wrap"'>
            <Flex flexWrap="wrap" {...purpleFlexWithSpacingProps()}>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
                <_Item>Wrapping Flex item</_Item>
            </Flex>
        </TitledBox>

        <TitledBox title='flex item > flexGrow="1"'>
            <Flex {...purpleFlexWithSpacingProps()}>
                <_Item className="sui-u-flex-grow-1">Growing Flex item</_Item>
                <_Item>Flex item</_Item>
            </Flex>
        </TitledBox>

        <TitledBox title='flex item > flexShrink="1"'>
            <Flex {...purpleFlexWithSpacingProps()}>
                <_Item
                    flexGrow="1"
                    flexShrink="1"
                    style={{ flexBasis: "300px" }}
                >
                    Shrink AND Grow Flex item
                </_Item>
                <_Item
                    flexGrow="1"
                    flexShrink="0"
                    style={{ flexBasis: "300px" }}
                >
                    Grow but don't shrink Flex item
                </_Item>
            </Flex>
        </TitledBox>
    </div>
);
