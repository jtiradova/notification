import { Image } from "@singlestore/fusion/components/image";
import { Flex, box } from "@singlestore/fusion/components/layout";
import { Paragraph, Strong } from "@singlestore/fusion/components/typography";

export default {
    title: "Components / Image",
    component: Image,
};

export const BasicUsage = () => {
    return (
        <Image
            src="https://source.unsplash.com/random/800x600"
            className={box({
                width: "full",
            })}
        />
    );
};

export const WithThemeConditionalSrc = () => {
    return (
        <Flex flexDirection="column" gap="5x">
            <Paragraph variant="body-3">
                <Strong>Switch themes to see the image source change</Strong>
            </Paragraph>
            <Image
                src={{
                    light: "https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blta31736f47de4296a/singlestore_logo_black.svg",
                    dark: "https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt0d7cce067f131839/singlestore_logo_white.svg",
                }}
                alt="Example of a theme conditional image"
                width="200"
            />
        </Flex>
    );
};
