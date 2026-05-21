import { ContentstackImage } from "@singlestore/fusion/components/image/contentstack-image";
import { Flex } from "@singlestore/fusion/components/layout";
import { Code, Paragraph } from "@singlestore/fusion/components/typography";

export default {
    title: "Components / ContentstackImage",
    component: Image,
};

export const BasicUsage = () => {
    return (
        <ContentstackImage
            src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltbbcebadc85d70c1e/6604068acf50d95b6817c881/RAG_to_Riches.png"
            width="500"
        />
    );
};

export const WithDifferentImageSrcViewports = () => {
    return (
        <Flex flexDirection="column" gap="5x">
            <div>
                <Paragraph variant="heading-3" mb="1x">
                    Resize your window and reload to see different images
                </Paragraph>
                <Paragraph variant="body-3">
                    We should use <Code>ContentstackImage</Code> when all the
                    images are identical, but different sizes. <br />
                    (the browser will pick the image it believes is most
                    appropriate)
                </Paragraph>
            </div>

            <ContentstackImage
                src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltbbcebadc85d70c1e/6604068acf50d95b6817c881/RAG_to_Riches.png"
                srcSm="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltd0b7c401471e0358/6604150e827286119d2229ce/Floppy_Disk.png"
                srcMd="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt5da972eee943f710/66041859e4b83546093f9a6b/Half-Assed.png"
                srcLg="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltafd17be286ec87ad/66044a61626e80424595816b/Sweet_Victor-y.png"
            />
        </Flex>
    );
};

export const WithCustomSizes = () => {
    return (
        <Flex flexDirection="column" gap="5x">
            <div>
                <Paragraph variant="heading-3" mb="1x">
                    Resize your window and reload to see different images
                </Paragraph>
                <Paragraph variant="body-3">
                    We should use <Code>ContentstackImage</Code> when all the
                    images are identical, but different sizes. <br />
                    (the browser will pick the image it believes is most
                    appropriate)
                </Paragraph>
            </div>

            <ContentstackImage
                src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltbbcebadc85d70c1e/6604068acf50d95b6817c881/RAG_to_Riches.png"
                srcSm="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltd0b7c401471e0358/6604150e827286119d2229ce/Floppy_Disk.png"
                srcMd="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt5da972eee943f710/66041859e4b83546093f9a6b/Half-Assed.png"
                srcLg="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltafd17be286ec87ad/66044a61626e80424595816b/Sweet_Victor-y.png"
                sizes={{
                    sm: 200,
                    md: 400,
                    lg: 600,
                }}
            />
        </Flex>
    );
};
