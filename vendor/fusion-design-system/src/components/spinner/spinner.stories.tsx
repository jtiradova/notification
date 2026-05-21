import { InlineFlex } from "@singlestore/fusion/components/layout";
import { Spinner } from "@singlestore/fusion/components/spinner/spinner";
import { Code, H1, Paragraph } from "@singlestore/fusion/components/typography";

export default {
    title: "Components / Spinner",
};

export const BasicUsage = () => {
    return (
        <InlineFlex flexDirection="column" gap="1x">
            <H1 variant="heading-4">Spinner Basic Usage</H1>
            <Paragraph>
                The <Code>Spinner</Code> component is very simple. It takes in
                the same props as <Code>Span</Code>
            </Paragraph>
            <Spinner mt="1x" />
        </InlineFlex>
    );
};

export const Colors = () => {
    return (
        <InlineFlex flexDirection="column" gap="1x">
            <H1 variant="heading-4">Spinner Colors</H1>
            <Paragraph>
                To change the colors of the spinner, you will need to change the{" "}
                <Code>--sui-component-spinner-thumb-color</Code> and{" "}
                <Code>--sui-component-spinner-background-color</Code> CSS
                variables
            </Paragraph>
            <Spinner
                mt="1x"
                style={
                    {
                        "--sui-component-spinner-thumb-color": "red",
                        "--sui-component-spinner-background-color": "blue",
                    } as React.CSSProperties
                }
            />
        </InlineFlex>
    );
};

export const Size = () => {
    return (
        <InlineFlex flexDirection="column" gap="1x">
            <H1 variant="heading-4">Spinner Size</H1>
            <Paragraph>
                The size of the spinner is dependent on the font size of it or
                its container
            </Paragraph>
            <Paragraph mt="1x">
                The below <Code>Spinner</Code> has font size{" "}
                <Code>heading-6</Code>
            </Paragraph>
            <Spinner fontSize="heading-6" />
            <Paragraph mt="1x">
                The below container has font size <Code>4rem</Code>, but the
                spinner does not have any props passed in
            </Paragraph>
            <InlineFlex
                alignItems="center"
                justifyContent="center"
                p="2x"
                alignSelf="start"
                style={{ fontSize: "4rem" }}
            >
                <Spinner />
            </InlineFlex>
        </InlineFlex>
    );
};
