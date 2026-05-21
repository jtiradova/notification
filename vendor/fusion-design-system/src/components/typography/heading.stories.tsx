import { faHashtag } from "@fortawesome/sharp-solid-svg-icons";

import { Alert } from "@singlestore/fusion/components/alert";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { Flex, Box, InlineFlex } from "@singlestore/fusion/components/layout";
import {
    H1,
    H6,
    HeadingAnchor,
    H5,
    H4,
    H3,
    H2,
} from "@singlestore/fusion/components/typography/heading";
import { Paragraph } from "@singlestore/fusion/components/typography/paragraph";
import { COLORS_CSS_VARIABLES } from "@singlestore/fusion/tokens/js/variables";
import {
    textVariantFontSizeInPx,
    fontSizeAlert,
    type StoryContext,
} from "@singlestore/fusion/utils/storybook";
import * as React from "react";

export default {
    title: "Components / Heading",
};

export const Docs = () => {
    return (
        <>
            <H1 mb="2x">Headings</H1>
            <Flex flexDirection="column" gap="1x">
                <a
                    target="_blank"
                    href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements"
                >
                    <b>Read more about heading elements on MDN</b>
                </a>
                <Paragraph>
                    A heading describes the content that follows it, much like a
                    news headline. When arriving at a new page, sighted users
                    gravitate toward headings to quickly find what they want on
                    the page. Screen reader and other assistive technology users
                    can also skip from heading to heading.
                </Paragraph>
                <Paragraph>
                    {`Headings create an outline for the page, similar to a term paper outline or table of contents. The <h1> describes the page as a whole (and should be similar to the page <title>). A page should typically have only one <h1>.`}
                </Paragraph>
                <Paragraph>{`Headings <h2> through <h6> represent increasing degrees of "indentation" in our conceptual "outline". As such, it does not make sense to skip heading levels, such as from <h2> to <h4>, going down the page. Here is an example of content hierarchy with corresponding heading levels:`}</Paragraph>
            </Flex>
            <Box my="2x">
                <code>
                    <pre
                        style={{
                            padding:
                                "0 var(--sui-space-2x) var(--sui-space-2x)",
                        }}
                    >
                        {`
H1: My Favorite Recipes
    H2: Quick and Easy
        H3: Spaghetti
        H3: Hamburgers
        H3: Tacos
            H4: Beef Tacos
            H4: Chicken Tacos
            H4: Fish Tacos
    H2: Some Assembly Required
        H3: Tuna Casserole
        H3: Lasagna
            H4: Vegetable Lasagna
            H4: Beef Lasagna
    H2: All-In
        H3: Crab-Stuffed Filet Mignon with Whiskey Peppercorn Sauce
        H3: Sun Dried Tomato and Pine Nut Stuffed Beef Tenderloin
`}
                    </pre>
                </code>
            </Box>
        </>
    );
};

export const WithAnchor = () => {
    return (
        <Flex flexDirection="column" gap="4x" px="6x">
            <H6 id="heading-1" variant="heading-1">
                <HeadingAnchor />
                Squidward, I used your clarinet to unclog my toilet!
            </H6>

            <H5 id="heading-2" variant="heading-2">
                <HeadingAnchor />
                Squidward, I used your clarinet to unclog my toilet!
            </H5>

            <H4 id="heading-3" variant="heading-3">
                <HeadingAnchor />
                Squidward, I used your clarinet to unclog my toilet!
            </H4>

            <H3 id="heading-4" variant="heading-4">
                <HeadingAnchor />
                Squidward, I used your clarinet to unclog my toilet!
            </H3>

            <H2 id="heading-5" variant="heading-5">
                <HeadingAnchor />
                Squidward, I used your clarinet to unclog my toilet!
            </H2>

            <H1 id="heading-6" variant="heading-6">
                <HeadingAnchor />
                Squidward, I used your clarinet to unclog my toilet!
            </H1>
        </Flex>
    );
};

export const WithAnchorCustom = () => {
    return (
        <Flex flexDirection="column" gap="4x" px="6x">
            <H6 id="custom-anchor" variant="heading-5">
                <HeadingAnchor>
                    <FaIcon icon={faHashtag} />
                </HeadingAnchor>
                Squidward, I used your clarinet to unclog my toilet!
            </H6>
        </Flex>
    );
};

export const WithAnchorStrict = () => {
    return (
        <Flex flexDirection="column" gap="4x" px="6x">
            {/* Uncommenting this should throw an error */}

            {/* <H6 variant="heading-5">
                <HeadingAnchor>
                    <FaIcon icon={faLink} />
                </HeadingAnchor>
                Strict anchor
            </H6> */}
            <H6 variant="heading-5">
                <HeadingAnchor strict={false} />
                Non-strict anchor (the anchor won't render because an id wasn't
                passed to the heading)
            </H6>
            <h2 id="explicit">explicit</h2>
            <H6 variant="heading-5">
                <HeadingAnchor href="#explicit" />
                Strict anchor with explicit href
            </H6>
        </Flex>
    );
};

export const BasicUsage = (_: any, context: StoryContext) => {
    return (
        <Flex flexDirection="column" gap="4x">
            <Alert title="Font Size" description={fontSizeAlert} />
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    heading-1 ({textVariantFontSizeInPx("heading-1", context)})
                </H2>
                <H2 variant="heading-1">
                    Squidward, I used your clarinet to unclog my toilet!
                </H2>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    heading-2 ({textVariantFontSizeInPx("heading-2", context)})
                </H2>
                <H2 variant="heading-2">
                    Squidward, I used your clarinet to unclog my toilet!
                </H2>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    heading-3 ({textVariantFontSizeInPx("heading-3", context)})
                </H2>
                <H2 variant="heading-3">
                    Squidward, I used your clarinet to unclog my toilet!
                </H2>
            </Box>

            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    heading-4 ({textVariantFontSizeInPx("heading-4", context)})
                </H2>
                <H2 variant="heading-4">
                    Squidward, I used your clarinet to unclog my toilet!
                </H2>
            </Box>

            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    heading-5 ({textVariantFontSizeInPx("heading-5", context)})
                </H2>
                <H2 variant="heading-5">
                    Squidward, I used your clarinet to unclog my toilet!
                </H2>
            </Box>

            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    heading-6 ({textVariantFontSizeInPx("heading-6", context)})
                </H2>
                <H2 variant="heading-6">
                    Squidward, I used your clarinet to unclog my toilet!
                </H2>
            </Box>
        </Flex>
    );
};

export const HeadingElements = () => {
    return (
        <Flex flexDirection="column" gap="4x">
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    {"<H1>"}
                </H2>
                <H1 variant="heading-4">Welcome to SingleStore!</H1>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    {"<H2>"}
                </H2>
                <H2 variant="heading-4">Welcome to SingleStore!</H2>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    {"<H3>"}
                </H2>
                <H3 variant="heading-4">Welcome to SingleStore!</H3>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    {"<H4>"}
                </H2>
                <H4 variant="heading-4">Welcome to SingleStore!</H4>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    {"<H5>"}
                </H2>
                <H5 variant="heading-4">Welcome to SingleStore!</H5>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="1x">
                    {"<H6>"}
                </H2>
                <H6 variant="heading-4">Welcome to SingleStore!</H6>
            </Box>
        </Flex>
    );
};

const PurpleBox = (props: React.ComponentProps<typeof Box>) => (
    <Box background="purple-2" alignSelf="start" {...props} />
);

const marginValue = "4x";

export const WithMargin = () => {
    return (
        <Box pl="0-25x">
            <H1 mb="0-5x">Using margin</H1>
            <Paragraph mb="2x">
                Negative margins exist too. Just add <code>"negative-"</code>{" "}
                before anything shown below. (e.g. <code>"negative-2x"</code>)
            </Paragraph>

            <PurpleBox>
                <H2 ml="negative-2x" mb="4x">
                    For example, this heading has negative margin.
                </H2>
            </PurpleBox>
            <InlineFlex>
                <Flex flexDirection="column" gap="4x">
                    <PurpleBox>
                        <H2
                            variant="heading-4"
                            m={marginValue}
                            style={{
                                backgroundColor:
                                    COLORS_CSS_VARIABLES["background-surface"],
                            }}
                        >
                            A Heading of with m: {marginValue}
                        </H2>
                    </PurpleBox>

                    <PurpleBox>
                        <H2
                            variant="heading-4"
                            mx={marginValue}
                            style={{
                                backgroundColor:
                                    COLORS_CSS_VARIABLES["background-surface"],
                            }}
                        >
                            A Heading of with mx: {marginValue}
                        </H2>
                    </PurpleBox>

                    <PurpleBox>
                        <H2
                            variant="heading-4"
                            my={marginValue}
                            style={{
                                backgroundColor:
                                    COLORS_CSS_VARIABLES["background-surface"],
                            }}
                        >
                            A Heading of with my: {marginValue}
                        </H2>
                    </PurpleBox>

                    <PurpleBox>
                        <H2
                            variant="heading-4"
                            mt={marginValue}
                            style={{
                                backgroundColor:
                                    COLORS_CSS_VARIABLES["background-surface"],
                            }}
                        >
                            A Heading of with mt: {marginValue}
                        </H2>
                    </PurpleBox>

                    <PurpleBox>
                        <H2
                            variant="heading-4"
                            mr={marginValue}
                            style={{
                                backgroundColor:
                                    COLORS_CSS_VARIABLES["background-surface"],
                            }}
                        >
                            A Heading of with mr: {marginValue}
                        </H2>
                    </PurpleBox>

                    <PurpleBox>
                        <H2
                            variant="heading-4"
                            mb={marginValue}
                            style={{
                                backgroundColor:
                                    COLORS_CSS_VARIABLES["background-surface"],
                            }}
                        >
                            A Heading of with mb: {marginValue}
                        </H2>
                    </PurpleBox>

                    <PurpleBox>
                        <H2
                            variant="heading-4"
                            ml={marginValue}
                            style={{
                                backgroundColor:
                                    COLORS_CSS_VARIABLES["background-surface"],
                            }}
                        >
                            A Heading of with ml: {marginValue}
                        </H2>
                    </PurpleBox>

                    <hr
                        style={{
                            borderColor: COLORS_CSS_VARIABLES["border-subtle"],
                            width: "100%",
                        }}
                    />
                </Flex>
            </InlineFlex>
        </Box>
    );
};

export const WithEllipsis = () => {
    return (
        <Flex flexDirection="column" gap="4x" style={{ maxWidth: "700px" }}>
            <H2 ellipsis variant="heading-4">
                A Heading of "heading-4" with an ellipsis. You don’t need a
                license to drive a sandwich! consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </H2>
        </Flex>
    );
};

export const WithTooltipOnHover = () => {
    return (
        <Flex flexDirection="column" gap="4x">
            <H2 variant="heading-4">
                A Heading of "heading-4" that shows a tooltip on hover
            </H2>
        </Flex>
    );
};

export const WithCenterAlign = () => {
    return (
        <Flex flexDirection="column" gap="4x">
            <H2 centerAlign variant="heading-3">
                A Heading of "heading-3" that is center aligned
            </H2>
        </Flex>
    );
};
