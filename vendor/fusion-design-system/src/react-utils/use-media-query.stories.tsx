import { Box } from "@singlestore/fusion/components/layout";
import { Paragraph, H3 } from "@singlestore/fusion/components/typography";
import useMediaQuery from "@singlestore/fusion/react-utils/use-media-query";
import { BREAKPOINTS } from "@singlestore/fusion/tokens/js/variables/supplementary";

export default {
    title: "Utilities / useMediaQuery",
};

export const BasicUsage = () => {
    const isMdNBelow = useMediaQuery(BREAKPOINTS["md-n-below"]);

    return (
        <Box>
            {isMdNBelow ? (
                <Paragraph color="red-1">md-n-below</Paragraph>
            ) : (
                <H3 color="indigo-1">I wont render when md-n-below</H3>
            )}
        </Box>
    );
};
