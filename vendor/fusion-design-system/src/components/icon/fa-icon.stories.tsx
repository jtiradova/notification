import {
    faCheck,
    faDatabase,
    faMinus,
    faPlus,
    faSmile,
    faX,
} from "@fortawesome/sharp-regular-svg-icons";
import { Box, box, InlineFlex } from "@singlestore/fusion/components/layout";
import {
    H1,
    H2,
    H3,
    Paragraph,
} from "@singlestore/fusion/components/typography";

import { FaIcon } from "./fa-icon";

export default {
    title: "Components / FaIcon",
    component: FaIcon,
};

export function FontAwesomeIcons() {
    return (
        <Box>
            <Box maxWidth="80x">
                <H1
                    display="flex"
                    alignItems="center"
                    gap="2x"
                    mb="2x"
                    variant="heading-5"
                >
                    <FaIcon icon={faSmile} />
                    Font Awesome Icons
                </H1>
                <Paragraph mb="2x" variant="body-3">
                    They are styled at `width/height: 1em` and `color:
                    currentColor` by default, which means they will inherit the
                    font-size and color of its container. <br />
                    You can see this above, the smiley face icon matches the
                    font-size of the heading its inside of.
                    <br />
                    <br />
                    You can change the size via its `font-size` in CSS or the
                    `size` React prop. The value `2em` means "twice the size of
                    the font-size of its container".
                    <br />
                    <br />
                    If no containers set a font-size, it will default to 16px.
                    So `2em` will be 32px.
                    <br />
                    <br />
                    You can use `display: flex` + `align-items: center` to align
                    them when placed within text elements, however be sure to
                    use `inline-flex` instead of `flex` for inline text elements
                    ({`<span>`}, {`<a>`}, etc.)
                    <br />
                    <br />
                    See the source code of this story for a better understanding
                </Paragraph>
            </Box>
            <hr
                className={box({
                    my: "4x",
                })}
            />
            <InlineFlex gap="4x" flexDirection="column">
                <InlineFlex alignItems="center" gap="4x">
                    <H3 variant="heading-2" minWidth="20x">
                        1x (default):{" "}
                    </H3>
                    <FaIcon icon={faCheck} />
                    <FaIcon icon={faMinus} />
                    <FaIcon icon={faPlus} />
                    <FaIcon icon={faX} />
                </InlineFlex>
                <InlineFlex alignItems="center" gap="4x">
                    <H3 variant="heading-2" minWidth="20x">
                        2x:{" "}
                    </H3>
                    <FaIcon size="2em" icon={faCheck} />
                    <FaIcon size="2em" icon={faMinus} />
                    <FaIcon size="2em" icon={faPlus} />
                    <FaIcon size="2em" icon={faX} />
                </InlineFlex>
                <InlineFlex alignItems="center" gap="4x">
                    <H3 variant="heading-2" minWidth="20x">
                        xs, sm, lg:
                    </H3>
                    <FaIcon size="xs" icon={faCheck} />
                    <FaIcon size="sm" icon={faCheck} />
                    <FaIcon size="lg" icon={faPlus} />
                </InlineFlex>
                <InlineFlex alignItems="center" gap="4x">
                    <H3 variant="heading-2" minWidth="20x">
                        1x inside heading
                    </H3>
                    <H2
                        display="flex"
                        alignItems="center"
                        gap="2x"
                        mb="2x"
                        variant="heading-5"
                    >
                        <FaIcon icon={faDatabase} />
                        Another example
                    </H2>
                </InlineFlex>
                <InlineFlex alignItems="center" gap="4x">
                    <H3 variant="heading-2" minWidth="20x">
                        2x inside heading with color
                    </H3>
                    <H2
                        display="flex"
                        alignItems="center"
                        gap="2x"
                        mb="2x"
                        color="purple-1"
                        variant="heading-5"
                    >
                        <FaIcon size="2em" icon={faDatabase} />
                        Another example
                    </H2>
                </InlineFlex>
                <InlineFlex gap="4x">
                    <H3 variant="heading-2" minWidth="20x">
                        Custom size (21px)
                    </H3>
                    <FaIcon icon={faCheck} style={{ fontSize: "21px" }} />
                </InlineFlex>
            </InlineFlex>
        </Box>
    );
}

export const FixedWidth = () => (
    <Box>
        <FaIcon icon={faX} />
    </Box>
);
