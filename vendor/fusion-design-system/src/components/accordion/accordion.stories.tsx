import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    AccordionTrigger,
} from "@singlestore/fusion/components/accordion/primitive";
import { Box, Flex } from "@singlestore/fusion/components/layout";
import { Paragraph } from "@singlestore/fusion/components/typography";

export default {
    title: "Primitives / Accordion",
};

export const BasicUsage = () => {
    return (
        <Flex gap="2x">
            <Accordion defaultValue={["1"]} type="multiple">
                <AccordionItem value="1">
                    <AccordionTrigger>
                        <AccordionHeader>
                            <Box>Accordion 1</Box>
                        </AccordionHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Paragraph>Content 1</Paragraph>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                    <AccordionTrigger>
                        <AccordionHeader>
                            <Box>Accordion 1</Box>
                        </AccordionHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Paragraph>Content 1</Paragraph>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
};
