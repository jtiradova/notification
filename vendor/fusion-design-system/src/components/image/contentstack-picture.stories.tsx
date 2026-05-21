import { Flex } from "@singlestore/fusion/components/layout";
import { Code, Paragraph } from "@singlestore/fusion/components/typography";
import { ContentstackPicture } from "./contentstack-picture";

export default {
    title: "Components / ContentstackPicture",
    component: ContentstackPicture,
};

const fullSizeImgProps = {
    width: "100%",
};

export const BasicUsage = () => {
    return (
        <ContentstackPicture
            src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltbbcebadc85d70c1e/6604068acf50d95b6817c881/RAG_to_Riches.png"
            imgProps={{ width: 500 }}
        />
    );
};

export const WithDifferentImageSrcViewports = () => {
    return (
        <Flex flexDirection="column" gap="5x">
            <div>
                <Paragraph variant="heading-3" mb="1x">
                    Resize your window and see different images instantly
                </Paragraph>
                <Paragraph variant="body-3">
                    We should use <Code>ContentstackPicture</Code> when we want
                    art direction, and have different images for each
                    breakpoint. <br />
                    (the browser will be forced to comply with our media
                    queries)
                </Paragraph>
            </div>

            <ContentstackPicture
                src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltbbcebadc85d70c1e/6604068acf50d95b6817c881/RAG_to_Riches.png"
                srcSm="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltd0b7c401471e0358/6604150e827286119d2229ce/Floppy_Disk.png"
                srcMd="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt5da972eee943f710/66041859e4b83546093f9a6b/Half-Assed.png"
                srcLg="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltafd17be286ec87ad/66044a61626e80424595816b/Sweet_Victor-y.png"
                imgProps={fullSizeImgProps}
            />
        </Flex>
    );
};

export const WithCustomSizes = () => {
    return (
        <Flex flexDirection="column" gap="5x">
            <div>
                <Paragraph variant="heading-3" mb="1x">
                    Resize your window and see different images instantly
                </Paragraph>
                <Paragraph variant="body-3">
                    We should use <Code>ContentstackPicture</Code> when we want
                    art direction, and have different images for each
                    breakpoint. <br />
                    (the browser will be forced to comply with our media
                    queries)
                </Paragraph>
            </div>

            <ContentstackPicture
                src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltbbcebadc85d70c1e/6604068acf50d95b6817c881/RAG_to_Riches.png"
                srcSm="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltd0b7c401471e0358/6604150e827286119d2229ce/Floppy_Disk.png"
                srcMd="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt5da972eee943f710/66041859e4b83546093f9a6b/Half-Assed.png"
                srcLg="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltafd17be286ec87ad/66044a61626e80424595816b/Sweet_Victor-y.png"
                sizes={{
                    sm: 200,
                    md: 400,
                    lg: 600,
                }}
                imgProps={fullSizeImgProps}
            />
        </Flex>
    );
};
