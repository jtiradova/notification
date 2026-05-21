import { Alert } from "@singlestore/fusion/components/alert";
import { Flex, Box, InlineFlex } from "@singlestore/fusion/components/layout";
import { H1, H2 } from "@singlestore/fusion/components/typography/heading";
import { Paragraph } from "@singlestore/fusion/components/typography/paragraph";
import {
    textVariants,
    Strong,
    Bold,
    Em,
    Span,
} from "@singlestore/fusion/components/typography/text";
import { COLORS_CSS_VARIABLES } from "@singlestore/fusion/tokens/js/variables";
import { omit } from "@singlestore/fusion/utils/object";
import {
    textVariantFontSizeInPx,
    fontSizeAlert,
    type StoryContext,
} from "@singlestore/fusion/utils/storybook";
import * as React from "react";

export default {
    title: "Components / Paragraph",
    component: Paragraph,
};

const paragraphStyleVariants = Object.keys(textVariants.variant) as Array<
    keyof typeof textVariants.variant
>;

const paragraphColors = Object.keys(textVariants.color) as Array<
    keyof typeof textVariants.color
>;

const negativeMarginKeys = Object.keys(textVariants.m).filter((key) =>
    key.includes("negative")
) as Array<keyof typeof textVariants.m>;

const paragraphMargins = Object.keys(
    omit(textVariants.m, ["auto", ...negativeMarginKeys])
).reverse() as Array<keyof typeof textVariants.m>;

export const BasicUsage = (_: any, context: StoryContext) => {
    return (
        <Flex flexDirection="column" gap="4x">
            <Alert title="Font Size" description={fontSizeAlert} />
            <H1>Using paragraphs</H1>
            {paragraphStyleVariants.map((variant) => (
                <Box key={variant}>
                    <H2 variant="heading-2" color="low-contrast" mb="0-5x">
                        {variant} {variant === "body-1" ? "(default)" : ""} (
                        {textVariantFontSizeInPx(variant, context)})
                    </H2>
                    <Paragraph variant={variant}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Iste tenetur soluta quam adipisci porro facilis
                        tempora quaerat doloribus a, dolorum at mollitia aperiam
                        quia alias! Quis earum officia cum autem? Lorem ipsum
                        dolor sit amet. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Vero impedit ut sequi non
                        exercitationem quae consequatur dolorem, numquam
                        nesciunt saepe neque et iusto fugiat, voluptatem
                        assumenda voluptate dolor necessitatibus veritatis, quis
                        dolores magni voluptates iure ad. Ratione, eius
                        recusandae? Suscipit aut quam voluptatibus veritatis
                        voluptates at. Aliquam, temporibus adipisci velit
                        accusantium explicabo ab delectus. Animi corrupti
                        molestiae quaerat, expedita velit repudiandae. Ut ex
                        doloribus beatae incidunt laudantium architecto ad.
                        Placeat vitae nihil dolore assumenda. Nesciunt qui quasi
                        obcaecati laborum, officiis exercitationem blanditiis
                        odit fugit, omnis sit quo nulla culpa similique saepe
                        optio corrupti deserunt sunt totam at expedita eum. Rem
                        aspernatur incidunt labore nobis accusantium dolor sint,
                        vero ducimus? Tempore quasi commodi molestiae ullam
                        aperiam iste fugit sequi eos deleniti, doloribus
                        possimus repudiandae praesentium assumenda, natus est
                        nisi ratione deserunt placeat quaerat incidunt vero id!
                        Minima, officia dignissimos. Reprehenderit quia
                        repudiandae voluptatibus a quidem adipisci perferendis
                        quibusdam, voluptatum id nihil facere expedita aliquid.
                        Doloribus culpa eveniet dolore.
                    </Paragraph>
                </Box>
            ))}
        </Flex>
    );
};

export const UsingStrongEmphasizedAndBoldText = () => {
    return (
        <Flex flexDirection="column" gap="4x">
            <Box>
                <H2
                    variant="heading-2"
                    color="low-contrast"
                    mb="0-5x"
                >{`Use '<Strong />' to indicate important, serious or urgent content`}</H2>
                <Paragraph>
                    Please note that{" "}
                    <Strong>
                        you can only resize your cluster once every six hours on
                        AWS
                    </Strong>
                    . Clusters cannot be downsized to S-00, S-0 or S-1;{" "}
                    <Strong>
                        the smallest you'll be able to downsize a cluster to is
                        S-2
                    </Strong>
                    .
                </Paragraph>
            </Box>
            <Box>
                <H2
                    variant="heading-2"
                    color="low-contrast"
                    mb="0-5x"
                >{`Use '<Bold />' to draw the reader's attention to the element contents without indicating special importance, as <Strong /> would`}</H2>
                <Paragraph>
                    Choose SingleStore for <Bold className="term">speed</Bold>{" "}
                    (accelerate time to insight with a database built for
                    ultra-fast ingest and high performance queries) and{" "}
                    <Bold className="term">scale</Bold> (build on a cloud-native
                    data platform designed for today’s most demanding
                    applications and analytical systems).
                </Paragraph>
            </Box>
            <Box>
                <H2 variant="heading-2" color="low-contrast" mb="0-5x">
                    Use {`<Em />`} to change the meaning of a sentence as spoken
                    emphasis does ("I <Em>love</Em> carrots" vs. "I love
                    carrots")
                </H2>
                <Paragraph>
                    We <Em>must</Em> be better.
                </Paragraph>
                <Paragraph>
                    There has <Em>never</Em> been a better time to be a
                    SingleStore user.
                </Paragraph>
                <Paragraph>
                    We're releasing new features out to you -{" "}
                    <Strong>
                        <Em>again!</Em>
                    </Strong>
                </Paragraph>
            </Box>
        </Flex>
    );
};

export const UsingSpan = () => {
    return (
        <Box>
            <H1 variant="heading-2" color="low-contrast" mb="0-5x">
                Using {`\`<Span />\``} to style inline text
            </H1>
            <Paragraph mb="2x">
                To style a word or phrase as inline text, wrap it in a{" "}
                <code>
                    <Span color="red-1">{`<Span />`}</Span>
                </code>{" "}
                component. This renders a{" "}
                <code>
                    <Span color="red-1">{`<span />`}</Span>
                </code>{" "}
                HTML element, whilst giving you access to the utility &amp;
                variant props you'd expect (
                <code>m, mx, my, mr, ml, mt, mb, color, variant</code>)
                <br /> However,{" "}
                <Strong>
                    {`<Span />`} should not be used to add bold or italic style
                    to text
                </Strong>
                . Instead, consider {`<Strong />`}, {`<Bold />`} or {`<Em />`}
            </Paragraph>
            <Box />
        </Box>
    );
};

export const AllColors = () => {
    return (
        <Box>
            {paragraphStyleVariants.map((variant) => (
                <Flex key={variant} flexDirection="column" gap="2x" mb="6x">
                    {paragraphColors.map((color) => (
                        <Box key={color}>
                            <H2 variant="heading-2" mb="0-5x">
                                {color} ({variant})
                            </H2>
                            <Paragraph
                                variant={variant}
                                color={color}
                                style={{
                                    backgroundColor: color.includes("inverse")
                                        ? COLORS_CSS_VARIABLES[
                                              "background-inverse"
                                          ]
                                        : "",
                                    alignSelf: "start",
                                }}
                            >
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Iste tenetur soluta quam
                                adipisci porro facilis tempora quaerat doloribus
                                a, dolorum at mollitia aperiam quia alias! Quis
                                earum officia cum autem? Lorem ipsum dolor sit
                                amet. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Vero impedit ut sequi non
                                exercitationem quae consequatur dolorem, numquam
                                nesciunt saepe neque et iusto fugiat, voluptatem
                                assumenda voluptate dolor necessitatibus
                                veritatis, quis dolores magni voluptates iure
                                ad. Ratione, eius recusandae? Suscipit aut quam
                                voluptatibus veritatis voluptates at. Aliquam,
                                temporibus adipisci velit accusantium explicabo
                                ab delectus. Animi corrupti molestiae quaerat,
                                expedita velit repudiandae. Ut ex doloribus
                                beatae incidunt laudantium architecto ad.
                                Placeat vitae nihil dolore assumenda. Nesciunt
                                qui quasi obcaecati laborum, officiis
                                exercitationem blanditiis odit fugit, omnis sit
                                quo nulla culpa similique saepe optio corrupti
                                deserunt sunt totam at expedita eum. Rem
                                aspernatur.
                            </Paragraph>
                        </Box>
                    ))}
                </Flex>
            ))}
        </Box>
    );
};

const PurpleBox = (props: React.ComponentProps<typeof Box>) => (
    <Box background="purple-2" alignSelf="start" {...props} />
);

export const WithMargin = () => {
    return (
        <Box pl="0-25x">
            <H1 mb="0-5x">Using margin</H1>
            <Paragraph mb="2x">
                Negative margins exist too. Just add <code>"negative-"</code>{" "}
                before anything shown below. (e.g. <code>"negative-2x"</code>)
            </Paragraph>

            <PurpleBox>
                <Paragraph ml="negative-2x" mb="4x">
                    For example, this paragraph has negative margin.
                </Paragraph>
            </PurpleBox>
            <InlineFlex>
                <Flex flexDirection="column" gap="4x">
                    {paragraphMargins.map((marginValue) => (
                        <>
                            <PurpleBox>
                                <Paragraph
                                    variant="body-1"
                                    m={marginValue}
                                    style={{
                                        backgroundColor:
                                            COLORS_CSS_VARIABLES[
                                                "background-surface"
                                            ],
                                    }}
                                >
                                    A paragraph with m: {marginValue}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sapiente ex tempora iste!
                                    Repellat fugit deserunt atque pariatur
                                    eaque, delectus eius est, hic neque
                                    possimus, totam voluptatibus nemo maiores
                                    doloremque aut?
                                    <br />
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Pariatur temporibus
                                    doloribus omnis iure ratione in quidem
                                    perferendis nulla magnam laudantium
                                    voluptate assumenda itaque mollitia delectus
                                    odio obcaecati, consectetur, perspiciatis
                                    sunt.
                                </Paragraph>
                            </PurpleBox>

                            <PurpleBox>
                                <Paragraph
                                    variant="body-1"
                                    mx={marginValue}
                                    style={{
                                        backgroundColor:
                                            COLORS_CSS_VARIABLES[
                                                "background-surface"
                                            ],
                                    }}
                                >
                                    A paragraph with mx: {marginValue}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sapiente ex tempora iste!
                                    Repellat fugit deserunt atque pariatur
                                    eaque, delectus eius est, hic neque
                                    possimus, totam voluptatibus nemo maiores
                                    doloremque aut?
                                </Paragraph>
                            </PurpleBox>

                            <PurpleBox>
                                <Paragraph
                                    variant="body-1"
                                    my={marginValue}
                                    style={{
                                        backgroundColor:
                                            COLORS_CSS_VARIABLES[
                                                "background-surface"
                                            ],
                                    }}
                                >
                                    A paragraph with my: {marginValue}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sapiente ex tempora iste!
                                    Repellat fugit deserunt atque pariatur
                                    eaque, delectus eius est, hic neque
                                    possimus, totam voluptatibus nemo maiores
                                    doloremque aut?
                                </Paragraph>
                            </PurpleBox>

                            <PurpleBox>
                                <Paragraph
                                    variant="body-1"
                                    mt={marginValue}
                                    style={{
                                        backgroundColor:
                                            COLORS_CSS_VARIABLES[
                                                "background-surface"
                                            ],
                                    }}
                                >
                                    A paragraph with mt: {marginValue}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sapiente ex tempora iste!
                                    Repellat fugit deserunt atque pariatur
                                    eaque, delectus eius est, hic neque
                                    possimus, totam voluptatibus nemo maiores
                                    doloremque aut?
                                </Paragraph>
                            </PurpleBox>

                            <PurpleBox>
                                <Paragraph
                                    variant="body-1"
                                    mr={marginValue}
                                    style={{
                                        backgroundColor:
                                            COLORS_CSS_VARIABLES[
                                                "background-surface"
                                            ],
                                    }}
                                >
                                    A paragraph with mr: {marginValue}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sapiente ex tempora iste!
                                    Repellat fugit deserunt atque pariatur
                                    eaque, delectus eius est, hic neque
                                    possimus, totam voluptatibus nemo maiores
                                    doloremque aut?
                                </Paragraph>
                            </PurpleBox>

                            <PurpleBox>
                                <Paragraph
                                    variant="body-1"
                                    mb={marginValue}
                                    style={{
                                        backgroundColor:
                                            COLORS_CSS_VARIABLES[
                                                "background-surface"
                                            ],
                                    }}
                                >
                                    A paragraph with mb: {marginValue}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sapiente ex tempora iste!
                                    Repellat fugit deserunt atque pariatur
                                    eaque, delectus eius est, hic neque
                                    possimus, totam voluptatibus nemo maiores
                                    doloremque aut?
                                </Paragraph>
                            </PurpleBox>

                            <PurpleBox>
                                <Paragraph
                                    variant="body-1"
                                    ml={marginValue}
                                    style={{
                                        backgroundColor:
                                            COLORS_CSS_VARIABLES[
                                                "background-surface"
                                            ],
                                    }}
                                >
                                    A paragraph with ml: {marginValue}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sapiente ex tempora iste!
                                    Repellat fugit deserunt atque pariatur
                                    eaque, delectus eius est, hic neque
                                    possimus, totam voluptatibus nemo maiores
                                    doloremque aut?
                                </Paragraph>
                            </PurpleBox>

                            <hr
                                style={{
                                    borderColor:
                                        COLORS_CSS_VARIABLES["border-subtle"],
                                    width: "100%",
                                }}
                            />
                        </>
                    ))}
                </Flex>
            </InlineFlex>
        </Box>
    );
};

export const WithEllipsis = () => {
    return (
        <Flex flexDirection="column" gap="4x" style={{ maxWidth: "700px" }}>
            {paragraphStyleVariants.map((variant) => (
                <Paragraph key={variant} ellipsis variant={variant}>
                    A paragraph of {variant} with an ellipsis. You don’t need a
                    license to drive a sandwich! consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </Paragraph>
            ))}
        </Flex>
    );
};

export const WithCenterAlign = () => {
    return (
        <Flex flexDirection="column" gap="4x">
            {paragraphStyleVariants.map((variant) => (
                <Paragraph key={variant} centerAlign variant={variant}>
                    A Paragraph of {variant} that is center aligned
                </Paragraph>
            ))}
        </Flex>
    );
};
