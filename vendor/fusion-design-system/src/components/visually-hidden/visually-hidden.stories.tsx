import { box, Box } from "@singlestore/fusion/components/layout";
import { Label } from "@singlestore/fusion/components/typography";
import { VisuallyHidden } from "@singlestore/fusion/components/visually-hidden/visually-hidden";

export default {
    title: "Utilities / VisuallyHidden",
};

export const BasicUsage = () => {
    return (
        <Box>
            <Label visuallyHidden htmlFor="visually-hidden-input">
                I&apos;m a visually hidden label
            </Label>
            <p className={box({ visuallyHidden: true })}>
                Some other visually hidden element
            </p>
            <input
                id="visually-hidden-input"
                placeholder="With visually hidden label"
                aria-describedby="visually-hidden-input-description"
            />
            <VisuallyHidden asChild>
                <p id="visually-hidden-input-description">
                    Visually hidden text is useful for screen readers. It can be
                    used to provide additional context to screen readers without
                    cluttering the visual layout of the page.
                </p>
            </VisuallyHidden>
            <p>Check the "Elements" &amp; "Accessibility" tabs in DevTools</p>
        </Box>
    );
};
